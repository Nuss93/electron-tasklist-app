let list = document.getElementById("list")
let newTask = document.getElementById("newTask")

console.log('task', newTask)

var row = 0;
const array = ['Wake up', 'Go to the gym', 'Cook lunch']

// function deleteTask(e) {
//     let ID = e.target.id.substr(5)
//     console.log("yeetus deletus", ID)
//     array.splice(ID, 1)
//     console.log('deletus successus', array)
// }

array.forEach((item, index) => {
	console.log('item',item)
    list.insertAdjacentHTML('beforeend', `<li id="list-${row}" class="list-group-item d-flex justify-content-between">${item}</li>`)

    row++
})
document.getElementById("addTask").addEventListener('click', () => {
    if(newTask.value !== ""){
        console.log('add task', newTask.value)
        array.push(newTask.value)
        list.insertAdjacentHTML('beforeend', `<li id="list-${row}" class="list-group-item d-flex justify-content-between">${newTask.value}</li>`)
        newTask.value = ""
        console.log('updated', list)
    } else {
        alert("Please input task before adding!")
    }

    row++
})
list.querySelectorAll(".list-group-item").forEach(item => {
    console.log('yo', item)
    item.addEventListener('click', myAlert)
})
function myAlert() {
    alert('You clicked on a task!\n\nGO DO IT NOW!')
}
