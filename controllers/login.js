const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const validLogin = !user ? false : await bcrypt.compare(password, user.passwordHash)

  if (!validLogin) {
    return response.status(401).json({ error: 'Invalid login' })
  }

  const userForToken = {
    id: user.id,
    username: user.username
  }

  const token = jwt.sign(
    userForToken,
    process.env.JWT_SECRET,
    {
      expiresIn: 60
    }
  )

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
