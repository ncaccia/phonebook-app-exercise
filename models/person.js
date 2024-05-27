const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGOATLAS_PHONEBOOK_DB_URI;
const port = process.env.PORT;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB on PORT:", port);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Must be at least 3 characters long"],
    required: [true, "Can't be blank"],
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return /(^\d{2})-\d{6,}|(^\d{3})-\d{5,}/.test(v);
      },
      message: (props) => {
        return `${props.value} is not a valid phone number: XX-XXXXXX... or XXX-XXXXX... format`;
      },
    },
    required: [true, "Can't be blank"],
  },
});

// Added toJSON + transform function to turn __id and __v into id string
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
