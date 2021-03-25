const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { server } = require('../index')
const User = require('../models/User')
const { api, getUsers, initialUser } = require('./helpers')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({
      username: 'jean',
      passwordHash: passwordHash
    })
    await user.save()
  })
  test('should create a fresh user', async () => {
    const usersAtStart = await getUsers()

    await api.post('/api/users')
      .send(initialUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const userNames = usersAtEnd.map(user => user.username)
    expect(userNames).toContain(initialUser.username)
  })

  test('should fails with proper status code if username already exists', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'jean',
      name: 'pepito',
      password: '123'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(400)
      // .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()
    expect(usersAtStart).toHaveLength(usersAtEnd.length)
  })
})

describe('Getting User', () => {
  test('should return proper status and content type', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
