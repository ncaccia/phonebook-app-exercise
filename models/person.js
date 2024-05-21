const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGOATLAS_PHONEBOOK_DB_URI;
const port = process.env.PORT;
console.log('connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
});

// Added toJSON + transform function to turn __id and __v into id string
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema);

