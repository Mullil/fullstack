import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.percentage == true) {
    return (
      <>
      <td>
        {props.text}
      </td>
      <td>
        {props.value} %
      </td>
      </>
    )
  }
  else {
    return (
      <>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
      </>
    )
  }
}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const total = props.total
  if (total == 0) {
    return (
      <div>
        No feedback given
      </div>
      )
  }
  else {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={good} percentage={false}/>
            </tr>
            <tr>
              <StatisticLine text="neutral" value={neutral} percentage={false}/>
            </tr>
            <tr>
              <StatisticLine text="bad" value={bad} percentage={false}/>
            </tr>
            <tr>
              <StatisticLine text="all" value={total} percentage={false}/>
            </tr>
            <tr>
              <StatisticLine text="average" value={(good-bad) / total} percentage={false}/>
            </tr>
            <tr>
              <StatisticLine text="positive" value={good / total * 100} percentage={true}/>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }

}


const Header = (props) => {
  return (
  <>
  <h1>
    {props.header}
  </h1>
  </>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const headers = ["give feedback", "statistics"]

  return (
    <div>
      <Header header={headers[0]}></Header>
      <Button handleClick={() => setGood(good + 1)} text="good"></Button>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"></Button>
      <Button handleClick={() => setBad(bad + 1)} text="bad"></Button>
      <Header header={headers[1]}></Header>
      <Statistics good={good} neutral={neutral} bad={bad} total={good+bad+neutral}></Statistics>
    </div>
  )
}

export default App
