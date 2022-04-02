const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/bookRoutes.js')
const genreRouter = require('./routes/genreRoutes.js')

const app = express();

// routing test - middleware
// app.use("/", (req, res, next) => {
//     res.send("Hello World")
// })

// MiddleWres
app.use(express.json()) // to parse json data in req
app.use("/books", router) //to direct the routes to localhost:5000/books
app.use("/genres", genreRouter) //to direct the routes to localhost:5000/genres

mongoose.connect('mongodb+srv://admin:admin123@catalogue.6adwq.mongodb.net/Catalogue?retryWrites=true&w=majority')
.then(() => { console.log('Connected to MongoDB') })
  .then(() => { app.listen(5000); console.log('Server started on port 5000') })
    .catch(err => console.log(err))