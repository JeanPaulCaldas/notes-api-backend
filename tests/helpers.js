const supertest = require('supertest')
const { app } = require('../index')

const initialNotes = [
  {
    content: 'Aprendiendo Node JS',
    important: true,
    date: new Date()
  },
  {
    content: 'Hola allí',
    important: false,
    date: new Date()
  }
]

const getAllNoteContents = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const api = supertest(app)

module.exports = { initialNotes, api, getAllNoteContents }
