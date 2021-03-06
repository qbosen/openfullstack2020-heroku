const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('post', (req, _) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)
    res.status(204).end()
})
app.post('/api/persons', ((req, res) => {
    const person = req.body
    if (!person.name || !person.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    }
    if (persons.filter(it => it.name === person.name).length !== 0) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    console.log('post add', person)
    person.id = Math.floor(Math.random() * 10e9)
    persons = persons.concat(person)
    res.json(person)
}))

app.get('/info', (req, res) => {
    res.send(`<div>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
</div>`)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})