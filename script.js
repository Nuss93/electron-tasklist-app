let newTask = document.getElementById("newTask")
let list = document.getElementById("list")
let todoItems = [];
// const array = ['Wake up', 'Go to the gym', 'Cook lunch']
var array = []

function getTodos () {
    const data = JSON.parse(window.localStorage.getItem('data')) || []
    console.log(data)
    array = data;
}
getTodos()

array.forEach((item, index) => {
    console.log('a', item, index)
    todoItems.push(item)
	renderTodo(item)
})

// function that adds a task into the todoItems array
function addTodo(text, index) {
    const todo = {
        text,
        checked: false,
        id: index || index === 0 ? index : Date.now(),
    };
    todoItems.push(todo)
    // console.log(todoItems)
    const currentTodos = JSON.parse(window.localStorage.getItem('data')) || []
    const updateTodos = [...currentTodos, todo]
    window.localStorage.setItem('data', JSON.stringify(updateTodos))
    
    renderTodo(todo)
}
function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key))
    todoItems[index].checked = !todoItems[index].checked

    window.localStorage.setItem('data', JSON.stringify(todoItems))

    renderTodo(todoItems[index])
}
function deleteTask(key) {
    console.log(todoItems, key)
    const index = todoItems.findIndex(item => item.id === Number(key))
    const todo = {
        deleted: true,
        ...todoItems[index]
    }

    todoItems = todoItems.filter(item => item.id !== Number(key));
    console.log(todo, index, todoItems)

    const updateTodos = todoItems
    window.localStorage.setItem('data', JSON.stringify(updateTodos))

    renderTodo(todo)
}

// event listener that listens when user clicks on button
document.getElementById('addTask').addEventListener('click', e => {
    addTodo(newTask.value)
    newTask.value = "";
    newTask.focus();
})

function renderTodo(todo) {
    // select the current todo item in the DOM
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted) {
        item.remove()
        return
    }

    const isChecked = !todo.checked ? '' : 'done';
    const node = document.createElement("li")
    node.setAttribute('class', `list-group-item d-flex align-items-center justify-content-between js-tick ${isChecked}`);
    node.setAttribute('data-key', todo.id)
    node.innerHTML = `
        <span>${todo.text}</span>
        <button class="btn btn-danger js-delete-todo">delete</button>
    `

    // checks if item already exists in the DOM
    if(item){
        // replace it
        list.replaceChild(node, item);
    } else {
        // console.log(node)
        list.append(node)
    }
}

// Select the entire list
// Add a click event listener to the list and its children
list.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.dataset.key
    console.log(itemKey, event.target.dataset)
    toggleDone(itemKey);
  }
  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key
    console.log('delete la', event.target.parentElement.dataset.key)
    deleteTask(itemKey);
  }
});

document.addEventListener('keypress', event => {
    if(event.key === "Enter") {
        addTodo(newTask.value)
        newTask.value = "";
        newTask.focus();
    }
})