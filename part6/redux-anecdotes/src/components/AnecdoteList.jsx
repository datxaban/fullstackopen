import { useSelector, useDispatch } from "react-redux"
import { upvoteAnecdote } from "../reducers/anecdoteReducer"
// import { setNotification, clearNotification } from "../reducers/notificationReducer"
import { setNotification } from "../reducers/notificationReducer"
import Notification from "./Notification"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(a => a.content.includes(state.filter))
  
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upvoteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`, 5))
    // dispatch(setNotification(
    //   `you voted '${anecdotes.find(a => a.id === id).content}'`
    //   , 5))
    // setTimeout(() => dispatch(clearNotification()), 5000)
    
  }

  return(
    <>
      <Notification />
      {
      anecdotes.sort((a, b) => b.votes - a.votes)
      // anecdotes
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList