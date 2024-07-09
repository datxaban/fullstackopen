import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(response => response.data)

export const createNew = content => 
  axios.post(baseUrl, {content}).then(response => response.data)

export const updateAnecdote = newObject => 
  axios.put(`${baseUrl}/${newObject.id}`, newObject).then(response => response.data)