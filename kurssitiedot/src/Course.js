const Course = ({ courses }) => {
  return (
    <div>{courses.map(element => <div key={element.id}><OneCourse course={element} /></div>)}</div>
  )
}

const OneCourse = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map(coursePart => <div key={coursePart.id}><Part part={coursePart.name} exercises={coursePart.exercises} /></div>)}
    </div>
  )
}

const Total = (props) => {
  const totalExercisesInitial = 0
  const sumWithInitial = props.course.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    totalExercisesInitial
  )

  return (
    <div>
      <p><b>Total of {sumWithInitial} exercises</b></p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}
      </p>
    </div>
  )
}

export default Course