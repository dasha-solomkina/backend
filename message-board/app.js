const express = require('express')
const app = express()
const path = require('path')
const indexRouter = require('./routes/index')
const messageRouter = require('./routes/message')

app.use(express.urlencoded({ extended: true }))
app.use('/', indexRouter)
app.use('/new', messageRouter)
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const PORT = 8080

app.listen(PORT, '0.0.0.0')
