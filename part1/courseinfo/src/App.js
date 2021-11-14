import logo from './logo.svg';
import './App.css';

import React from 'react'

const Header = (input) => {
    return (
        <>
            <h1>{input.course}</h1>
        </>
    )
}

const Part = (input) => {
    return (
        <>
            <p>
                {input.part} {input.exercises}
            </p>
        </>
    )
}

const Content = (input) => {
    let [part1, part2, part3] = input.parts
    return (
        <>
            <Part part={part1.name} exercises={part1.exercises}/>
            <Part part={part2.name} exercises={part2.exercises}/>
            <Part part={part3.name} exercises={part3.exercises}/>
        </>
    )
}

const Total = (input) => {
    let [part1, part2, part3] = input.parts
    return (
        <>
            <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
        </>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default App