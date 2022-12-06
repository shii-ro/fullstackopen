import { useState } from 'react'

const Display = ({ text, anecdote, votes }) => {
  return (
    <>
      <h1>{text}</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const Button = ({ text, clickHandler }) => {
  return (
    <>
      <button onClick={clickHandler}>{text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0));

  const selectRandomQuote = (length) => {
    let randomQuoteIndex = Math.floor(Math.random() * (length - 0) + 0);
    setSelected(randomQuoteIndex);
  }

  const voteQuote = (index) => {
    const newArray = [...votes];
    newArray[index]++;
    setVote(newArray);
  }

  const mostVotedQuote = () => {
    let largest = 0;
    for (let i = 0, k = votes.length; i < k; i++) {
      if (votes[i] > votes[largest]) largest = i;
    }
    return largest;
  }


  return (
    <div>
      <Display text="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="Vote" clickHandler={() => voteQuote(selected)} />
      <Button text="Next anecdote" clickHandler={() => selectRandomQuote(anecdotes.length - 1)} />
      <Display text="Anecdote with most votes" anecdote={anecdotes[mostVotedQuote()]} votes={votes[mostVotedQuote()]} />
    </div>
  )
}

export default App;
