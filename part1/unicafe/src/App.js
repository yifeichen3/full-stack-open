import { useState } from 'react'

const Button = ({handleClick, name}) => {
  return (
    <>
      <button onClick={handleClick}>{name}</button>
    </>
  )
}

const Result = ({name, number}) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{number}</td>
      </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  } else {
      return (
        <>
          <h1>statistics</h1>
          <table>
            <Result name="good" number={good}/>
            <Result name="neutral" number={neutral}/>
            <Result name="bad" number={bad}/>
            <Result name="all" number={good + neutral + bad}/>
            <Result name="average" number={(good - bad) / (good + neutral + bad)}/>
            <Result name="positive" number={good / (good + neutral + bad) * 100 + " %"}/>
          </table>
        </>
      )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} name="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} name="neutral" />
      <Button handleClick={() => setBad(bad + 1)} name="bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App

