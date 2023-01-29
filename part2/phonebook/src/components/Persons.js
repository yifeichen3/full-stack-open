const Persons = ({filterPersons, confirmDelete}) => {
  return (
    <>
      {filterPersons.map((person) => {
        return (
          <>
            <div key={person.id}>{person.name} {person.number} <button onClick={() => confirmDelete(person)}>delete</button></div>
          </>
        )
      })}
    </>
  )
}

export default Persons