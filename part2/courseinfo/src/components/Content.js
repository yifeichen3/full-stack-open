import Part from "./Part";

const Content = ({parts}) => {
  const sum = parts.reduce(
    (a, c) => a + c.exercises,
    0,
  )

  return (
    <>
      {parts.map(part => <Part part={part.name} exercises={part.exercises}/>)}
      <b>total of {sum} exercises</b>
    </>
  )
}

export default Content