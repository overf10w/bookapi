var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// bookAPI will be created if doesn't exist
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// good way to handle multiple routes is to use router (instead of app.get())
var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function(req, res) {
        // req.body is body of POST method. it is populated via bodyParser
        var book = new Book(req.body);

        console.log(book);
        res.send(book);
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
        res.json(responseJson);
    });

bookRouter.route('/Books/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err) 
                res.status(500).send(err);
            else
                res.json(book);
        });
        res.json(responseJson);
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log('Running on PORT:' + port);
});

