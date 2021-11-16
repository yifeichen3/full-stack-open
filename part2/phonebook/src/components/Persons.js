import React from 'react'

const Show = ({person}) => {
    return (
        <div>
            {person.name} {person.number}
        </div>
    )
}

const Persons = ({persons, searchWord}) => {
    const filterPersons = persons.filter(person => person.name.includes(searchWord.toLowerCase()))
    return (
        <div>
            {filterPersons.map((person, i) => <Show key={i} person={person}/>)}
        </div>
    )
}

export default Persons