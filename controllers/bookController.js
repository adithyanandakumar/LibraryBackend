const { json } = require('express/lib/response');
const bookModel = require('../models/bookModel.js')

//controller is used to simplyify routing methods

//1.get every book
const getAllBooks = async (req, res, next) => {
    let books;
        try {
            books = await bookModel.find();
        } catch (err) {
            console.log(err)
        }

        // to check if any books are available
        if(!books){
            return res.status(404).json({ message : "No books available"})
        }
        return res.status(200).json({ books })
}

//2.add a book
const addBook = async (req, res, next) => {
    let book;
    try {
        book = new bookModel({
            name : req.body.name,//allows to acccess body parameter from json req
            description : req.body.description,
            genre : req.body.genre,
        })
    await book.save(); //save data to DB

    } catch (err) {
        console.log(err)
    }

    // to check if we can add book
    if(!book){
        return res.status(404).json({ message : "Book not added"})
    }
    return res.status(200).json({ book })

}

// 3.get a book by id (search)
const getBookById = async (req, res, next) => {
    let book;
    const id = req.params.id;//accessing id
    try {
        book = await bookModel.findById(id);
    } catch (error) {
        console.log(error)
    }

    if(!book){
        return res.status(404).json({message: "No such book!!"})
    }
    return res.status(200).json({ book })
}

// 4.update a book
const updateBook = async (req, res, next) => {
    let book;
    const id = req.params.id;
    try {

        book = await bookModel.findByIdAndUpdate(id, {
            name : req.body.name,
            description : req.body.description,
            genre : req.body.genre,
        })
        book = await bookModel.save();  
    } catch (error) {
        console.log(error)
    }

    if(!book){
        return res.status(404).json({message: "No such book!!"})
    }
    return res.status(200).json({ book })
}

// 5. delete a book
const deleteBook = async (req, res, next) => {
    let book;
    const id = req.params.id;
    try {
        book = await bookModel.findByIdAndDelete(id);
    } catch (error) {
        console.log(error)
    }
    if(!book){
        return res.status(404).json({message: "Couldn't delete. Check ID."})
    }
    return res.status(200).json({ message : "Book deleted."})
}

// 6. search a book
const searchBook = async (req, res, next) => {
    let book;
    const key = req.params.key;
    try {
        book = await bookModel.find({
            "$or": [

                {"name":{ $regex : new RegExp(key, "i") }},
                {"description":{ $regex : new RegExp(key, "i") }},
            
            ]})
    } catch (error) {
        console.log(error)
    }
    if(!book){
        return res.status(404).json({message: "No such book!!🤔"})
    }
    return res.status(200).json({ book })
}




exports.getAllBooks = getAllBooks;
exports.addBook = addBook;
exports.getBookById = getBookById;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.searchBook = searchBook;
