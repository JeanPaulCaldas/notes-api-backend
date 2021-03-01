module.exports = (error, request, response, next) => {
  console.error(error)
  response.status(error.name === 'CastError' ? 400 : 500).end()
}
