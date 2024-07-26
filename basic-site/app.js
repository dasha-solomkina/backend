const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const links = [
  { href: '/', text: 'Home' },
  { href: 'about', text: 'About' },
]

const linkBack = '/'

app.get('/', (req, res) => {
  res.render('index', { links: links })
})
app.get('/about', (req, res) => {
  res.render('about', { linkBack })
})

app.use(express.static(path.join(__dirname, 'public')))

app.listen(3000)

// #2
// app.get('/', (req, res) => {
//   res.render('index', { message: 'EJS rocks!' }) // index - “a template called index in the specified folder”
//   // the second argument is an object of variables that are to be made available to that specific template
// })

// #1
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, './index.html'))
// })

// app.get('/about', (req, res) => {
//   res.sendFile(path.join(__dirname, './about.html'))
// })

// app.get('/contact-me', (req, res) => {
//   res.sendFile(path.join(__dirname, './contact-me.html'))
// })

// app.use((req, res) => {
//   res.status(404).sendFile(path.join(__dirname, './404.html'))
// })
