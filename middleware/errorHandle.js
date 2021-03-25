const errorHandlers = {
  CastError: response => response.status(400).send({ error: 'id used is malformed' }),
  ValidationError: (response, error) => response.status(409).send({ error: error.message }),
  JsonWebTokenError: response => response.status(401).send({ error: 'Invalid authorization' }),
  TokenExpiredError: response => response.status(401).send({ error: 'Expired authorization' }),
  default: (response, error) => {
    console.error(error)
    response.status(500).end()
  }
}

module.exports = (error, request, response, next) => {
  const handler = errorHandlers[error.name]
  handler(response, error)
}
