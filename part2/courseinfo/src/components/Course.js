import React from 'react'
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({courses}) => {
    return (
        <div>
            <h1>Web Development Curriculum</h1>
            {courses.map(
                course =>
                    <div key={course.id}>
                        <Header name={course.name}/>
                        <Content parts={course.parts}/>
                        <Total course={course}/>
                    </div>
            )}
        </div>
    )
}

export default Course