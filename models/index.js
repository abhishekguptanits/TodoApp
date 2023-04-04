const mongoose = require('mongoose');
mongoose.set('debug', true);

// mongoose.connect('mongodb://localhost/todo-api'); 

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.DB_CLUSTERNAME;
const dbname = process.env.DB_DBNAME;

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');

