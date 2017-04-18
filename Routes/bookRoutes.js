var express = require('express');

var routes = function(Book) {
    var bookRouter = express.Router();

    bookRouter.route('/Books')
        .post(function(req, res) {
            // req.body is body of POST method. it is populated via bodyParser
            var book = new Book(req.body);

            book.save();
            res.status(201).send(book);
        })
        .get(function (req, res) {
            // localhost/api/books?genre=Fiction ->>> req.query = { genre: 'Fiction' }
            var query = {};
            // allow only genre filtering
            if (req.query.genre) {
                query.genre = req.query.genre;
            }
            // Book is instance of Book schema that's hooked up to mongoose & mongodb
            Book.find(query, function (err, books) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });

    bookRouter.route('/Books/:bookId')
        .get(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) 
                    res.status(500).send(err);
                else
                    res.json(book);
            });
        })
        .put(function (req, res) {
            Book.findById(req.params.bookId, function (err, book) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    book.save();
                    res.json(book);
                }
            });
        });
    
    return bookRouter;
};

module.exports = routes;