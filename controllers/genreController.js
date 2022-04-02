// require model
const bookModel = require('../models/bookModel.js');

// 1.get every genre
const getAllGenres = async (req, res, next) => {
    let genres;
        try {
            genres = await bookModel.find(
                // only return the book's genre
                {},
                { genre: 1, _id: 0 }
            );
        } catch (err) {
            console.log(err)
        }
        // the genres should not repeat
        var uniqueGenres = [...new Set(genres.map(genre => genre.genre))];

    if(!genres){
        return res.status(404).json({ message : "No genres available"})
    }
    return res.status(200).json({ genres : uniqueGenres })
}

// 2.count books in each genre and return the count
const countBooksInGenre = async (req, res, next) => {
    let genres;
        try {
            genres = await bookModel.aggregate([
                { $group: { _id: "$genre", count: { $sum: 1 } } }
            ]);
        } catch (err) {
            console.log(err)
        }
        
    if(!genres){
        return res.status(404).json({ message : "No genres available"})
    }
    return res.status(200).json({ genres : genres })
}


exports.getAllGenres = getAllGenres
exports.countBooksInGenre = countBooksInGenre