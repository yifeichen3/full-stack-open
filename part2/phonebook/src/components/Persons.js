const Persons = ({filterPersons}) => {
  return (
    <>
      {filterPersons.map((person) => <div key={person.id}>{person.name} {person.number}</div>)}
    </>
  )
}

export default Persons