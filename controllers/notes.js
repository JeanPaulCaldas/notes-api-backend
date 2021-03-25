const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

const userExtractor = require('../middleware/userExtractor')

notesRouter.get('/', (_request, response, next) => {
  Note.find().populate('user', {
    username: 1,
    name: 1
  })
    .then(notes => response.json(notes))
    .catch(next)
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findById(id).populate('user', {
    username: 1,
    name: 1
  })
    .then(note => note ? response.json(note) : response.status(404).end())
    .catch(next)
})

notesRouter.delete('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params

  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(next)
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const {
    content,
    important = false
  } = request.body

  const { userId } = request

  if (!content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const user = await User.findById(userId)

  const newNote = new Note({
    content,
    date: new Date(),
    important,
    user: user.id
  })

  const savedNote = await newNote.save()

  user.notes = user.notes.concat(savedNote.id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important !== 'undefined' ? note.important : false
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => response.json(result))
    .catch(next)
})

module.exports = notesRouter
