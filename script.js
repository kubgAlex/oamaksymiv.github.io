const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = [];
  if(localStorage.getItem('todo') != undefined){
     todos = JSON.parse(localStorage.getItem('todo'));
     render()
  }
let id = 0;

class Todo {
    constructor() {
        this.id = id++;
        this.text = this.getText();
        this.checked = false;
    }
    getText() {
        return prompt('Введіть вашу справу:')
    }
}

function newTodo() {
    const todo = new Todo();
    todos.push(todo);
    render();
}

function render() {
    list.innerHTML = '';
    console.log('todos:', todos);
    todos.map(todo => renderTodo(todo)).forEach(todo => list.appendChild(todo))
    itemCountSpan.textContent = todos.length;
    uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
    localStorage.setItem('todo', JSON.stringify(todos));
}

function renderTodo(todo) {
    const li = document.createElement('li');
    li.innerHTML = `
    <input type = "checkbox" onchange="changeTodo(${todo.id})" ${todo.checked ? 'checked' : ''}>
    <button onclick="deleteTodo(${todo.id})"> delete </button>
    <span>${todo.text}</span>`
    return li;
}

function deleteTodo(id) {
    console.log('from deleteTodo')
    todos = todos.filter(todo => todo.id !== id)
    render();
}

function changeTodo(id) {
    todos = todos.map(todo => todo.id === id ? {id: todo.id, text: todo.text, checked: !todo.checked} : todo);
    uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
}
