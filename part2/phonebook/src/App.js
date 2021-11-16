import React, {useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }
    const addPerson = (event) => {
        event.preventDefault()
        const person = persons.filter(person => (person.name === newName))
        if (person.length === 0) {
            const newPerson = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        } else {
            window.alert(`${newName} ${newNumber} is already added to phonebook`)
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchWord={newSearch} handleSearchChange={handleSearchChange}/>
            <h2>Add a New</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                        newNumber={newNumber} handleNumberChange={handleNameChange}/>
            <h2>Numbers</h2>
            <Persons persons={persons} searchWord={newSearch}/>
        </div>
    )
}

export default App