const { Router } = require('express')
const indexRouter = Router()
const userController = require('../controllers/userControllers')

// GET / - Render home page with usernames
indexRouter.get('/', userController.getUsernames)

// GET /new - Render form page
indexRouter.get('/new', userController.createUsernameGet)

// POST /new - Handle form submission
indexRouter.post('/new', userController.createUsernamePost)

module.exports = indexRouter
