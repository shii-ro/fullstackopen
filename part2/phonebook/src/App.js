import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import service from "./services/Phonebook";
import Message from "./components/Message";


const App = () => {

  const [persons, setPersons] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: ' ', number: '' })
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    const newName = event.target.value;
    const newObj = { ...newPerson, name: newName }
    setNewPerson(newObj);
  }

  const handleNumberChange = (event) => {
    const newNumber = event.target.value;
    const newObj = { ...newPerson, number: newNumber }
    setNewPerson(newObj);
  }

  const newMessage = (content, type) => {
    const newMsg = { content, type }
    setMessage(newMsg)
    setTimeout(() => {
      setMessage(null)
    }, 5000);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const personExists = persons.find(person => person.name === newPerson.name);
    if (personExists) {
      if (window.confirm(`${personExists.name} is already added to phonebook, replace the old number with a new one?`)) {
        service
          .update(personExists.id, newPerson)
          .then(
            returnedPerson => {
              setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson))
              setNewPerson({ name: '', number: '' })
              newMessage(`Updated ${newPerson.name}`, true)
            }
          )
          .catch(error => {
            console.log(error)
            newMessage(`${newPerson.name} has already been removed from server`, false)
          })
      };
      return;
    }

    service
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson({ name: '', number: '' })
        newMessage(`Added ${newPerson.name}`, true)
      })
  }

  const deletePerson = (p) => {
    if (window.confirm(`Delete ${p.name}?`)) {
      service.del(p.id).then(() => {
        setPersons(persons.filter(person => person.id !== p.id))
        newMessage(`deleted ${p.name}`, false)
      })
        .catch(error => {
          console.log(error)
          newMessage(`${p.name} has already been removed from server`, false)
        })
    }
  }

  return (
    <div>
      <Message msg={message} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm
        addName={addPerson}
        newPerson={newPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} delPerson={deletePerson} />
    </div>
  )
}
export default App;
