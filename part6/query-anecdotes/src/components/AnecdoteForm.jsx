import { createNew } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from '../NotificationContext'
const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], previousAnecdotes.concat(newAnecdote) )
    },
    onError: (error) => {
      dispatch({ type: 'SET_NOTIFICATION', data: 'too short anecdote, must have length 5 or more' })
      setTimeout(() => {
        dispatch({ type: 'SET_NOTIFICATION', data: '' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
