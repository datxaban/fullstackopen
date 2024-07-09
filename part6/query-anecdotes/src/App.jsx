import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], previousAnecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    },
})

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      id: anecdote.id,
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({ type: 'SET_NOTIFICATION', data: `anecdote '${anecdote.content}' voted`})
    setTimeout(() => {
      dispatch({ type: 'SET_NOTIFICATION', data: ''})
    }, 5000)
  }

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      refetchOnWindowFocus: false,
    }
  )


  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data || []

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
