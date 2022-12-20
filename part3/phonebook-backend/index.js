const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = 3001;

morgan.token('type', (req, res) => { 
    console.log(req.body);
    return JSON.stringify(req.body);
})

app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

let phonebook = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
]

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(person => person.id === id);
    if (person) {
        res.send(person);
    } else {
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    phonebook = phonebook.filter(person => person.id !== id);
    res.status(204).end();
})

app.get(`/api/persons`, (req, res) => {
    res.send(phonebook);
})

app.post(`/api/persons`, (req, res) => {
    const newPerson = { ...req.body, id: Math.floor(Math.random() * 1337) };
    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({ error: 'must insert name or number' })
    }
    if (phonebook.find(person => person.name === newPerson.name)) {
        return res.status(400).json({ error: `${newPerson.name} is already added in the phonebook` })
    }
    phonebook = phonebook.concat(newPerson);
    res.json(newPerson);
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`
            <p>Phonebook has info for ${phonebook.length} people</p>
            <p>${date.toDateString()} ${date.toTimeString()}</p>
            `);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})