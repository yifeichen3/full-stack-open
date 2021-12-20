import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/persons"

const Notification = ({message}) => {
    if (message == null) {
        return null
    }
    console.log(message)
    console.log(message.includes('ERROR'))
    if (message.includes('ERROR')) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else {
        return (
            <div className="success">
                {message}
            </div>
        )
    }
}

const App = () => {
    const [message, setMessage] = useState(null)
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newSearch, setNewSearch] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3002/api/persons')
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }
    const deletePerson = (person) => {
        const result = window.confirm(`Delete ${person.name} ?`)
        if (result) {
            phoneService
                .deletePerson(person.id)
                .then(returnedPerson => {
                    setPersons(persons.data.filter(person => returnedPerson.id !== person.id))
                })
                .catch(error => {
                    setMessage(`[ERROR] ${error.response.data.error}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }
    const addPerson = (event) => {
        event.preventDefault()
        const person = persons.data.filter(person => (person.name === newName))
        const newPerson = {
            name: newName,
            number: newNumber
        }
        if (person.length === 0) {
            phoneService
                .create(newPerson)
                .then(returnedPerson => {
                    console.log("here")
                    setPersons(persons.data.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setMessage(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setMessage(`[ERROR] ${error.response.data.error}`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        } else {
            const result = window.confirm(`${newName} is already added to phonebook. replace the old number with
             a new one?`)
            if (result) {
                phoneService
                    .update(person[0].id, newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.data.map(person => person.name === returnedPerson.name ? returnedPerson : person))
                        setNewName('')
                        setNewNumber('')
                        setMessage(`Updated ${returnedPerson.name}`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setMessage(`[ERROR] ${error.response.data.error}`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
            }
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message}/>
            <Filter searchWord={newSearch} handleSearchChange={handleSearchChange}/>
            <h2>Add a New</h2>
            <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={persons} searchWord={newSearch} deletePerson={deletePerson}/>
        </div>
    )
}

export default App