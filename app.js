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

// we're executing this func in order to return bookRouter from it
var bookRouter = require('./Routes/bookRoutes')(Book);

// good way to handle multiple routes is to use router (instead of app.get())
app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function() {
    console.log('Running on PORT:' + port);
});

