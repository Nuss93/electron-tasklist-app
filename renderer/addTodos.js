'use strict'

// const { ipcRenderer } = require("electron")

document.getElementById('addTask').addEventListener('click', () => {
    const newTask = document.getElementById('newTask')
    console.log('add', newTask.value)

    ipcRenderer.send('add-todos', newTask.value)
    newTask.value = ''
    newTask.focus()
})