// Exercise: create a mongo.js and let user add entries to the phonebook, and for list all of the existing entries in the phonebook.

// Command example: node mongo.js yourpassword Anna 040-1234556
// Print example: added Anna number 040-1234556 to phonebook

const mongoose = require('mongoose');

const password = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];
const url =
    `mongodb+srv://ncacciavillani:${password}@cluster0.owy48zj.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// Condition to check if user entered the password - Exit + any non-zero value argument indicates that the process terminated with an error.
if (process.argv.length < 3) {
    console.log('Please give your-password as argument');
    process.exit(1);
}

// Schema to structure the data inside the document
const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
});
// Model in singular and match it with the Schema
const Person = mongoose.model('Person', personSchema);

mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');
        console.log(' ');
        if (process.argv.length === 3) { // Condition === Only password passed
            return Person.find({})
                .then(result => {
                    console.log('Phonebook:');
                    result.forEach(p => {
                        console.log(`${p.name} ${p.phone}`);
                    });
                    console.log(' ');
                    mongoose.connection.close();
                })
        } else if (process.argv.length === 5) { // Condition === password, name and phone passed
            const person = new Person({
                name: name,
                phone: phone,
            });
            return person.save()
                .then(result => {
                    console.log(`added ${name} number ${phone} to phonebook`);
                    mongoose.connection.close();
                });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mongoose.connection.close()
    });