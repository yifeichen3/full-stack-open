import React, { useState } from 'react'

const ShowText = ({text}) => {
  return(
      <div>
          {text}
      </div>
  )
}

const ShowMostVote = ({anecdotes, point}) => {
    let index = 0;
    for (let i = 0; i < point.length; ++i) {
        if (point[i] > point[index]) {
            index = i
        }
    }
    return(
        <div>
            {anecdotes[index]}
        </div>
    )
}


const App = () => {
    const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
    ]

    const [selected, setSelected] = useState(0)
    const [point, setPoint] = useState([0,0,0,0,0,0,0])

    const addVote = () => {
        const copy = [...point]
        copy[selected] = copy[selected] + 1
        setPoint(copy)
    }

    const next = () => {
        if (selected === anecdotes.length - 1) {
            setSelected(0)
        } else {
            setSelected(selected + 1)
        }
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <ShowText text={anecdotes[selected]}/>
            <ShowText text={"has " + point[selected] + " votes"}/>
            <button onClick={addVote}>vote</button>
            <button onClick={next}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <ShowMostVote anecdotes={anecdotes} point={point}/>
        </div>
    )
}

export default App