const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.post('/', (request, response, next) => {
  const { username, name, password } = request.body

  const user = new User({
    username,
    name,
    passwordHash: password
  })

  user.save()
    .then(savedUser => response.json(savedUser))
    .catch(next)
})

module.exports = usersRouter
