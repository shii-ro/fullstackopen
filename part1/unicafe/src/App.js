import { useState } from 'react'

const Header = ({ text }) => <><h1>{text}</h1></>
const Button = ({ text, handleClick }) => <><button onClick={handleClick}>{text}</button></>
const StatisticLine = ({ text, value }) => <><tr><td>{text}</td><td>{value}</td></tr></>

const Statistics = ({ good, neutral, bad }) => {
  if((good + neutral + bad) === 0) return <><p>No feedback given</p></>

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine value={good + neutral + bad} text="all" />
      <StatisticLine value={(good - bad) / (good + neutral + bad)} text="average" />
      <StatisticLine value={((good / (good + neutral + bad))* 100) + ' %'} text="positive" />
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App