const jwt = require('jsonwebtoken')

module.exports = (request, response, next) => {
  const auth = request.get('authorization')

  let token = ''
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    token = auth.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json()
  }

  const { id: userId } = decodedToken
  request.userId = userId

  next()
}
