// controllers/usersController.js
const asyncHandler = require('express-async-handler')
const usersStorage = require('../storages/usersStorage')

exports.usersCreateGet = asyncHandler(async (req, res) => {
  res.render('users', {
    title: 'User List',
    users: usersStorage.getUsers(),
  })
})

exports.usersCreatePost = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, age, bio } = req.body
  usersStorage.addUser({ firstName, lastName, email, age, bio })
  res.redirect('/')
})

const { body, validationResult } = require('express-validator')

const alphaErr = 'must only contain letters.'
const lengthErr = 'must be between 1 and 10 characters.'

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
]

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('users', {
        title: 'User List',
        errors: errors.array(),
      })
    }
    const { firstName, lastName, email, age, bio } = req.body
    usersStorage.addUser({ firstName, lastName, email, age, bio })
    res.redirect('/')
  }),
]

// for updating

exports.usersUpdateGet = asyncHandler(async (req, res) => {
  const user = usersStorage.getUser(req.params.id)
  res.render('update', { user, errors: [] })
})

exports.usersUpdatePost = [
  validateUser,
  asyncHandler(async (req, res) => {
    const user = usersStorage.getUser(req.params.id)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('update', {
        errors: errors.array(),
        user: user,
      })
    }
    const { firstName, lastName, email, age, bio } = req.body
    usersStorage.updateUser(req.params.id, {
      firstName,
      lastName,
      email,
      age,
      bio,
    })
    res.redirect('/')
  }),
]

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = asyncHandler(async (req, res) => {
  const user = usersStorage.getUser(req.params.id)
  usersStorage.deleteUser(req.params.id)
  res.redirect('/')
})
