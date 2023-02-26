var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var dotenv = require("dotenv")

dotenv.config()
mongoose.set('strictQuery', true)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoDB = "mongodb://localhost:27017/projectdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error"))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);



if (process.env.NODE_ENV ==="development"){
    var corsOtions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    } 
    app.use(cors(corsOtions))
}

module.exports = app;
