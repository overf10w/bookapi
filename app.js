var express = require('express'),
    mongoose = require('mongoose');
// bookAPI will be created if doesn't exist
var db = mongoose.connect('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

// good way to handle multiple routes is to use router (instead of app.get())
var bookRouter = express.Router();

bookRouter.route('/Books')
    .get(function (req, res) {
        // Book is instance of Book schema that's hooked up to mongoose & mongodb
        Book.find(function (err, books) {
            if (err) {
                console.log(err);
                return;
            }
            else
                res.json(books);
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

