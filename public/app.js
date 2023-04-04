/* const todosUrl = "http://localhost:3000/api/todos";

$.ajax({
    url: todosUrl
})
.done((res) => {
    console.log(res);
    const list = $('.list');
    for(let i=0; i<res.length; i++) {
        list.append(`<li>${res[i].name}</li>`);
    }
})
.fail((err) => {
    console.log(err);
}) */


$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)

    $('#todoInput').keypress(function(event) {
        // ENTER ↵ key has a keycode of 13
        if(event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    })

    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();        // event bubbling & propagation
        removeTodo($(this).parent());
    })
})


function addTodos(todos) {
    // add todos to page here
    todos.forEach(addTodo);
}

function addTodo(todo) {
    let newTodo = $('<li class="Task">' + todo.name + ' <span>X</span></li>');
    // newTodo.addClass("Task");
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}


function createTodo() {
    // send request to create new todo, post request  '/api/todos'
    let usrInput = $('#todoInput').val();
    $.post('/api/todos', {name: usrInput})
    .then(function(newTodo) {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(err => {
        console.log(err);
    })
}

function updateTodo(todo) {
    let clickedId = todo.data('id');
    let isDone = !todo.data('completed');
    let updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: `/api/todos/${clickedId}`,
        data: updateData
    })
    .done(function(updatedTodo) {
        todo.toggleClass('done');
        todo.data('completed', isDone);
    })
    .fail(function(err) {
        console.log(err);
    })
}

function removeTodo(todo) {
    let clickedId = todo.data('id');
    let deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE', 
        url: deleteUrl
    })
    .then(function(data) {
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    })
}