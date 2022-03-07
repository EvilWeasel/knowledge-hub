const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = process.env.PORT || 7777;
const mongo_port = process.env.MONGO_PORT || 27017;
const path = require('path');

// set urlencoded
// makes all request parameters available
// e.g. req.body.username
app.use(express.urlencoded({ extended: false }));

// setup method override
// allows us to use PUT and DELETE requests in forms instead of just POST / GET
app.use(methodOverride('_method'));

// import the routes
const r_index = require('./routes/r_index');
const r_articles = require('./routes/r_articles');


// setup ejs for express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// connect to mongo-db
//mongoose.connect(`mongodb://mongo:${mongo_port}/knowledge-hub`, {
//useNewUrlParser: true,
//useUnifiedTopology:true,
//auth:{
//username: 'root',
//password: 'root'
//}
//});

//mongoose.connect(`mongodb://mongo:${mongo_port}/knowledge-hub`, {
//authSource: "admin",
//user: mongo_username,
//pass: mongo_password,
//useNewUrlParser: true,
//useUnifiedTopology: true,
//useCreateIndex: true,
//useFindAndModify: false,
//});

mongoose.connect(`mongodb://mongo:${mongo_port}/knowledge-hub`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// add routes to the app
app.use('/', r_index);
app.use('/articles', r_articles);

// add route for static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(port)