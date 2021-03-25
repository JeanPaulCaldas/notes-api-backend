const supertest = require('supertest')
const { app } = require('../index')
const User = require('../models/User')

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

const initialUser = {
  username: 'default_user',
  name: 'Juanito',
  password: 'contra123'
}

const getAllNoteContents = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map(user => user.toJSON())
}

const api = supertest(app)

module.exports = {
  initialNotes,
  initialUser,
  api,
  getAllNoteContents,
  getUsers
}
