const db = require('../models');

exports.getTodos = (req, res) => {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
}

exports.createTodo = (req, res) => {
    // const todo = new db.Todo(req.body);
    // await todo.save();   // requires async function
    db.Todo.create(req.body)
    .then((newTodo) => {
        res.status(201).json(newTodo);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.getTodo = (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then((foundTodo) => {
        res.json(foundTodo);
    })
    .catch((err) => {
        res.send(err);
    })
}

exports.updateTodo = (req, res) => {
    /* db.Todo.findByIdAndUpdate(req.params.todoId, req.body, {new: true})
    .then((updatedTodo) => {
        res.json(updatedTodo);
    })
    .catch((err) => {
        res.send(err);
    }) */
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then((todo) => {
        res.json(todo);
    })
    .catch((err) => {
        res.send(err);
    })
};

exports.deleteTodo = (req, res) => {
    /* db.Todo.findByIdAndDelete(req.params.todoId)
    .then((deletedTodo) => {
        res.json(deletedTodo);
    })
    .catch((err) => {
        res.send(err);
    }) */
    db.Todo.findOneAndDelete({_id: req.params.todoId})
    .then(function() {
        res.json({message: "Item deleted successfully"});
    })
    .catch(function(err) {
        res.send(err);
    })
};