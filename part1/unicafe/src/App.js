import React, {useState} from 'react'

const ShowData = (props) => {
    return (
        <td>{props.text} {props.data}</td>
    )
}

const Statistics = ({good, neutral, bad, total}) => {
    if (total === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <tr><ShowData text="good" data={good}/></tr>
                <tr><ShowData text="neutral" data={neutral}/></tr>
                <tr><ShowData text="bad" data={bad}/></tr>
                <tr><ShowData text="all" data={total}/></tr>
                <tr><ShowData text="average" data={(good - bad) / total}/></tr>
                <tr><ShowData text="positive" data={good / total * 100}/></tr>
            </tbody>
        </table>
    )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const updateGood = () => {
      setGood(good + 1)
      setTotal(total + 1)
  }

  const updateNeutral = () => {
      setNeutral(neutral + 1)
      setTotal(total + 1)
  }

  const updateBad = () => {
      setBad(bad + 1)
      setTotal(total + 1)
  }


  return (
      <div>
          <h1>give feedback</h1>
          <button onClick={updateGood}>good</button>
          <button onClick={updateNeutral}>neutral</button>
          <button onClick={updateBad}>bad</button>
          <h1>statistics</h1>
          <Statistics good={good} neutral={neutral} bad={bad} total={total}/>

      </div>
  )
}

export default App
