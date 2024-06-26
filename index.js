require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

// middleware to logging the request body
morgan.token("reqBody", (req) => {
  if (req.method === "POST" || req.method === "PUT") {
    return JSON.stringify(req.body);
  }
  return "";
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :reqBody"
  )
);

app.post("/api/people", (req, res, next) => {
  const regex = new RegExp(`^${req.body.name}$`, "i");
  Person.findOne({ name: { $regex: regex } })
    .exec()
    .then((result) => {
      if (!result || req.body.name === "") {
        const person = new Person({
          name: req.body.name,
          phone: req.body.phone,
        });
        person
          .save()
          .then((savedPerson) => {
            res.json(savedPerson);
          })
          .catch((err) => next(err));
      } else {
        return res.status(409).json({
          error: "Conflict: The name already exists in the phonebook",
        });
      }
    })
    .catch((err) => next(err));
});

app.get("/api/people", (req, res, next) => {
  Person.find({})
    .then((people) => res.json(people))
    .catch((err) => next(err));
});

app.get("/info", (req, res, next) => {
  Person.find({})
    .then((people) => {
      const timestamp = Date();
      const phonebookCount = people.length;
      res.send(
        `<p>Phonebook has info for ${phonebookCount} people
            <br/>${timestamp}</p>`
      );
    })
    .catch((err) => next(err));
});

app.get("/api/people/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => res.json(person))
    .catch((err) => next(err));
});

app.delete("/api/people/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

app.put("/api/people/:id", (req, res, next) => {
  const { name, phone } = req.body;
  Person.findByIdAndUpdate(
    req.params.id,
    { name, phone },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (!updatedPerson) {
        console.log("error: Person not found");
        res.status(404).json({ error: "Person not found" });
      } else {
        res.json(updatedPerson);
      }
    })
    .catch((err) => next(err));
});

// - - - - - - - - - - - - - - - - - - - - - - - -

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint); // call the unknown endpoint error handler

const errorHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "id not founded" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};
app.use(errorHandler); // call the error handler

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
