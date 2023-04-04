const express = require('express');
const router = express.Router();
const helpers = require('../helpers/todos');

/* router.get('/', helpers.getTodos);
router.post('/', helpers.createTodo); */
router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

/* router.get('/:todoId', helpers.getTodo);
router.put('/:todoId', helpers.updateTodo);
router.delete('/:todoId', helpers.deleteTodo); */
router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);


module.exports = router;