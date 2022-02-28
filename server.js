const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 7777;

// set urlencoded
// makes all request parameters available
// e.g. req.body.username
app.use(express.urlencoded({extended: false}));

// import the routes
const r_index = require('./routes/r_index');
const r_articles = require('./routes/r_articles');


// setup ejs for express
app.set('view engine', 'ejs');


// connect to mongo-db
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology:true });

// add routes to the app
app.use('/', r_index);
app.use('/articles', r_articles);

app.listen(port)