import { useState, useEffect } from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const foundPerson = persons.filter(person => person.name === newName)
    if (foundPerson.length > 0) {
      // alert(`${newName} is already added to phonebook`)
      if (window.confirm(`${foundPerson[0].name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(foundPerson[0].id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id === foundPerson[0].id? updatedPerson: person))
            setNewName('')
            setNewNumber('')
            setMessage(`Added ${newName}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            console.log(error);
            setMessage(`Error: Information of ${newName} has already been removed from server`);
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          });
      }
    } else {
      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error);
          setMessage(`Error: Information of ${newName} has already been removed from server`);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        });
    }
  }

  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
      const newPersons = persons.filter(p => p.id !== person.id);
      setPersons(newPersons);
    }
  }

  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handleNameChange={handleNameChange}
                  newName={newName} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons filterPersons={filterPersons} confirmDelete={confirmDelete}/>
    </div>
  )
}

export default App
