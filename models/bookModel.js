const mongoose = require('mongoose')



const Schema = mongoose.Schema// creating the model/schema of the book

const bookSchema = new Schema({
    
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    //link to the genre
    genre: {
        type: String,
        enum : ["fiction","non-fiction","biography","self-help","education","others"],
        required: true
    }
})


    


// exporting so that it can be used globally

module.exports = mongoose.model("bookModel",bookSchema)
