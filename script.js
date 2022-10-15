let newTask = document.getElementById("newTask")
let list = document.getElementById("list")
let todoItems = [];
const array = ['Wake up', 'Go to the gym', 'Cook lunch']

array.forEach((item, index) => {
    // console.log(item)
	addTodo(item, index)
})

// function that adds a task into the todoItems array
function addTodo(text, index) {
    const todo = {
        text,
        checked: false,
        id: index ? index : Date.now(),
    };
    todoItems.push(todo)
    // console.log(todoItems)
    renderTodo(todo)
}
function toggleDone(key) {
    const index = todoItems.findIndex(item => item.id === Number(key))
    todoItems[index].checked = !todoItems[index].checked
    renderTodo(todoItems[index])
}

// event listener that listens when user clicks on button
document.getElementById('addTask').addEventListener('click', e => {
    console.log('here!', newTask.value)
    addTodo(newTask.value)
    newTask.value = "";
    newTask.focus();
})

function renderTodo(todo) {
    // select the current todo item in the DOM
    const item = document.querySelector(`[data-key='${todo.id}']`);

    const isChecked = !todo.checked ? '' : 'done';
    const node = document.createElement("li")
    node.setAttribute('class', `list-group-item d-flex justify-content-between js-tick ${isChecked}`);
    node.setAttribute('data-key', todo.id)
    node.innerHTML = `
        <span>${todo.text}</span>
        <button class="js-delete-todo">delete</button>
    `
    // console.log(todo, item)
    console.log(node)
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
    // const itemKey = event.target.parentElement.dataset.key;
    const itemKey = event.target.dataset.key
    console.log(itemKey)
    toggleDone(itemKey);
  }
  if (event.target.classList.contains('js-delete-todo')) {
    // const itemKey = event.target.parentElement.dataset.key;
    const itemKey = event.target.dataset.key
    console.log('delete la', event.target.parentElement.dataset.key)
    // toggleDone(itemKey);
  }
});

// ================================
// let list = document.getElementById("list")
// let newTask = document.getElementById("newTask")

// console.log('task', newTask)

// var row = 0;
// const array = ['Wake up', 'Go to the gym', 'Cook lunch']

// array.forEach((item, index) => {
// 	console.log('item',item)
//     list.insertAdjacentHTML('beforeend', `<li id="deleteTask" class="list-group-item d-flex justify-content-between">${item}</li>`)

//     row++
// })
// document.querySelector('#addTask').onclick = function() {
//     console.log('fuck')
//     if(newTask.value !== ""){
//         console.log('add task', newTask.value)
//         array.push(newTask.value)
//         list.insertAdjacentHTML('beforeend', `<li id="deleteTask" class="list-group-item d-flex justify-content-between">${newTask.value}</li>`)
//         newTask.value = ""
//         console.log('updated', list)

//         var current_tasks = document.querySelectorAll(".deleteTask");
//         for (let i = 0; i < current_tasks.length; i++) {
//             current_tasks[i].onclick = function(){
//                 console.log(this)
//                 // this.nodeName.remove()
//             }
//         }
//     } else {
//         alert("Please input task before adding!")
//     }
// }

// document.getElementById("addTask").addEventListener('click', () => {
//     if(newTask.value !== ""){
//         console.log('add task', newTask.value)
//         array.push(newTask.value)
//         list.insertAdjacentHTML('beforeend', `<li id="list-${row}" class="list-group-item d-flex justify-content-between">${newTask.value}</li>`)
//         newTask.value = ""
//         console.log('updated', list)
//     } else {
//         alert("Please input task before adding!")
//     }

//     row++
// })

