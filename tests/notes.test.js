const mongoose = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')

const { initialNotes, api, getAllNoteContents } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  // parallel
  /* const notes = initialNotes.map(note => new Note(note))
  const promises = notes.map(note => note.save())
  await Promise.all(promises) */

  // sequential
  for (const note of initialNotes) {
    const model = new Note(note)
    await model.save()
  }
})

describe('notes', () => {
  test('returned as json', async () => {
    await api.get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should be same amout of notes', async () => {
    const { response } = await getAllNoteContents()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('first note is about learning', async () => {
    const { response } = await getAllNoteContents()
    expect(response.body[0].content).toBe(initialNotes[0].content)
  })

  test('should contain second note', async () => {
    const { contents } = await getAllNoteContents()
    expect(contents).toContain(initialNotes[1].content)
  })

  test('should add a valid note', async () => {
    const newNote = {
      content: 'A new valide note',
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response, contents } = await getAllNoteContents()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('should reject an invalid note', async () => {
    const newNote = {
      important: true
    }

    await api.post('/api/notes')
      .send(newNote)
      .expect(400)

    const { response } = await getAllNoteContents()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
