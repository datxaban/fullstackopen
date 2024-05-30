import { useState } from 'react'

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  const average = (props.good - props.bad) / all;
  const positive = (props.good / all) * 100;

  return (
    <>
      { !props.isfeedback ? 
      <p>No feedback given</p>
      :
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={props.good} /></tr>
          <tr><StatisticLine text="neutral" value={props.neutral} /></tr>
          <tr><StatisticLine text="bad" value={props.bad} /></tr>
          <tr><StatisticLine text="all" value={all} /></tr>
          <tr><StatisticLine text="average" value={average} /></tr>
          <tr><StatisticLine text="positive" value={positive} /></tr>
        </tbody>
      </table>
      }
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value} {props.text === 'positive'? '%':''}</td>
    </>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [isfeedback,setIsfeedback] = useState(false);

  const handleClickGood = () => {
    setGood(good + 1);
    setIsfeedback(true);
  }
  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setIsfeedback(true);
  }
  const handleClickBad = () => {
    setBad(bad + 1);
    setIsfeedback(true);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} isfeedback={isfeedback}/>
    </div>
  )
}

export default App