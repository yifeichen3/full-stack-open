import React from 'react'

const Show = ({person, deletePerson}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
    )
}

const Persons = ({persons, searchWord, deletePerson}) => {
    const filterPersons = persons.filter(person => person.name.includes(searchWord.toLowerCase()))
    return (
        <div>
            {filterPersons.map((person, i) => <Show key={i} person={person} deletePerson={deletePerson}/>)}
        </div>
    )
}

export default Persons