const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URL

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error(err))

/* const note = new Note({
  content: 'Test del increible Mongo DB',
  date: new Date(),
  important: true
})

note.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => console.error(err)) */
