require('dotenv').config()
const morgan = require('morgan');
const express = require('express');
const app = express();
const cors = require('cors');
const Person = require('./models/person');

app.use(express.json())
app.use(cors());
app.use(express.static('dist'))

// middleware to logging the request body
morgan.token('reqBody', (req) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        return JSON.stringify(req.body);
    }
    return '';
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :reqBody'))


let personsData = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "phone": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "phone": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "phone": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "phone": "39-23-6423122"
    }
];

app.post('/api/people', (req, res) => {
    const regex = new RegExp(req.body.name, 'i');
    Person.findOne({ name: { $regex: regex } }).exec()
        .then(result => {
            if (!result) {
                const person = new Person({
                    name: req.body.name,
                    phone: req.body.phone,
                })
                person.save().then((savedPerson) => {
                    res.json(savedPerson);
                })
            } else {
                return res.status(409).json({
                    error: 'Conflict: The name already exists in the phonebook'
                })
            }
        });
})

app.get('/api/people', (req, res) => {
    Person.find({}).then(people => res.json(people));
})

app.get('/info', (req, res) => {
    Person.find({}).then(people => {
        const timestamp = Date();
        const phonebookCount = people.length
        res.send(
            `<p>Phonebook has info for ${phonebookCount} people
            <br/>${timestamp}</p>`
        )
    })
})

app.get('/api/people/:id', (req, res) => {
    Person.findById(req.params.id).then(person => res.json(person))
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id);
    personsData = personsData.filter(p => p.id !== id);
    res.status(200).end();
})


const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);



