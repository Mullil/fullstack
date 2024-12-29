const Header = (props) => {
    return (
      <>
      <h2>{props.course['name']}</h2>
      </>
    )
  }
  
  const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>
        {props.name} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part['name']} exercises={part['exercises']}/>
        )}
        <Total parts={parts}/>
  
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const all_exercises  = parts.map(part => part.exercises)
    const total = all_exercises.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0,
    )
  
    return (
      <>
      <p>
        <strong>Number of exercises {total}</strong>
      </p>
      </>
    )
  }
  
  const Course = (props) => {
    return (
      <>
      <Header course={props.course}></Header>
      <Content parts={props.course['parts']}></Content>
      
      </>
    )
  }

export default Course