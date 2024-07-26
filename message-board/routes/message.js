const { Router } = require('express')

const messageRouter = Router()

messageRouter.get('/', (req, res) => {
  res.render('form', { title: 'Send a message' })
})

module.exports = messageRouter
