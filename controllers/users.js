const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', (request, response, next) => {
  User.find({}).populate('notes', {
    content: 1,
    date: 1
  })
    .then(result => response.json(result))
    .catch(next)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const passwordHash = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    name,
    passwordHash: passwordHash
  })

  user.save()
    .then(savedUser => response.json(savedUser))
    .catch(next)
})

module.exports = usersRouter
