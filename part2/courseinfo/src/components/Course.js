const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part.name} {props.part.exercises}</p>
        </>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => {
        return (s + p.exercises);
    }, 0);
    return (
        <>
            <p><b>Total of {total} exercises</b></p>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;