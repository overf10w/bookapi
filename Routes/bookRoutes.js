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
    // Middleware
    bookRouter.use('/:bookId', function (req, res, next) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) {
                res.status(500).send(err);
            } else if (book) {
                req.book = book;
                // call next get, put, del etc
                next();
            } else {
                res.status(404).send('no book found');
            }
        });
    });

    bookRouter.route('/Books/:bookId')
        .get(function (req, res) {
            // Now we don't handle errors here, it's done in middleware
            res.json(req.book);
        })
        .put(function (req, res) {
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book.save();
            res.json(req.book);
        });
    
    return bookRouter;
};

module.exports = routes;