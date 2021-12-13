import React from 'react'

const Show = ({person, deletePerson}) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button>
        </div>
    )
}

const Persons = ({persons, searchWord, deletePerson}) => {
    if (persons && persons.data) {
        const filterPersons = persons.data.filter(person => person.name.includes(searchWord.toLowerCase()))
        return (
            <div>
                {filterPersons.map((person, i) => <Show key={i} person={person} deletePerson={deletePerson}/>)}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Persons