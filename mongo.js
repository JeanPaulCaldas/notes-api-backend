const mongoose = require('mongoose')

const { MONGO_DB_URL, MONGO_DB_URL_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URL_TEST : MONGO_DB_URL

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err))
