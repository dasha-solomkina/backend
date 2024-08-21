const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
require('dotenv').config()
console.log(process.env)

app.use(express.urlencoded({ extended: true }))
app.use('/', indexRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('Server running on http://localhost:3000')
})
