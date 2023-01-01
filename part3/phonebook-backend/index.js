const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();
const PORT = process.env.PORT || 3000


morgan.token('type', (req, res) => {
    return JSON.stringify(req.body);
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    if(error.name === 'ValidationError') {
        return res.status(400).json({error: error.message})
    }

    next(error)
}

app.use(express.json())
app.use(express.static('build'))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person) res.json(person);
            else res.status(404).end();
        }).catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const person = { ...req.body }

    Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
        .then(updatedPerson => { res.json(updatedPerson) })
        .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(
            result => res.status(204).end()
        ).catch((err) => next(err));
})

app.get(`/api/persons`, (req, res) => {
    Person.find({}).then(person => {
        res.json(person)
    })
})

app.post(`/api/persons`, (req, res, next) => {
    const newPerson = new Person({ ...req.body });
    if (!newPerson.name || !newPerson.number) {
        return res.status(400).json({ error: 'must insert name or number' })
    }

    Person.countDocuments({ name: newPerson.name }, { limit: 1})
        .then(
            person => {
                console.log(person, newPerson);
                if (person) return res.status(400).json({ error: 'person already exists in database!' });
                else {
                    newPerson.save()
                        .then(savedPerson => {
                            return res.json(savedPerson);
                        })
                        .catch(error => next(error));
                }
            }
        )
        .catch((err) => next(err));
})

app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`
            <p>Phonebook has info for ${phonebook.length} people</p>
            <p>${date.toDateString()} ${date.toTimeString()}</p>
            `);
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
