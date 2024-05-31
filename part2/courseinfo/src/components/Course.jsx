const Header = (props) => {
  
  return <h1>{props.course}</h1>;
}



const Total = (props) => {
  return (
    <b>
      total of {props.parts.reduce((acc, part) => acc + part.exercises, 0)} exercises
    </b>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </div>
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

export default Course