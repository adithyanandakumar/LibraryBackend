// require express and controller
const express = require('express')
const genreController = require('../controllers/genreController.js')

const genreRouter = express.Router()

// using express's router for navigation to urls
genreRouter.get('/', genreController.getAllGenres)
genreRouter.get('/count', genreController.countBooksInGenre)

module.exports = genreRouter