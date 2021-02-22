const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  console.log(request.method)
  console.log(request.path)
  console.log(request.body)

  next()
})

let notes = [
  {
    id: 1,
    content: 'Nota 1',
    date: '2020-11-01T19:20:00',
    important: true
  },
  {
    id: 2,
    content: 'Nueva nota 2',
    date: '2020-11-01T19:20:00',
    important: true
  },
  {
    id: 3,
    content: 'Nueva nota 3',
    date: '2020-11-01T19:20:00',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello mundo</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)
  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  console.log(note)
  notes = [...notes, newNote]

  response.status(201).json(newNote)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
