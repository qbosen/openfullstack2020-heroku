const mongoose = require('mongoose')

if (process.argv.length !== 5 && process.argv.length !== 3) {
    console.log('add person: node mongo.js <password> <name> <number>')
    console.log('show all persons: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.maysf.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

// show all
if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(it => {
            console.log(`${it.name} ${it.number}`)
        })
        mongoose.connection.close()
    })

    return
}

const name = process.argv[3]
const number = process.argv[4]


const person = new Person({
    name: name,
    number: number
})


person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})


