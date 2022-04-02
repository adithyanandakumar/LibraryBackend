const express = require('express')
const bookController = require('../controllers/bookController.js')

const router = express.Router()

//using express's router for navigation to urls

router.get(("/"),bookController.getAllBooks)
router.post(("/"),bookController.addBook)
router.get(("/:id"),bookController.getBookById)
router.put(("/:id"),bookController.updateBook)
router.delete(("/:id"),bookController.deleteBook)
router.get(("/search/:key"),bookController.searchBook)


module.exports = router;