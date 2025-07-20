const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const citaRoutes = require('./routes/citas.routes')

dotenv.config()
const app = express()

app.use(express.json())

app.use('/api/citas', citaRoutes)

app.get('/', (req, res) => {
  res.send('api de citas medicas funcionando correctamente')
})
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('conectado a mongodb')
    app.listen(3000, () => {
      console.log('servidor corriendo en http://localhost:3000')
    })
  })
  .catch(err => {
    console.error('error al conectar a mongodb:', err.message)
  })
