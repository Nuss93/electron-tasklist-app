'use strict'
const Store = require('electron-store')

class DataStore extends Store {
    constructor(settings) {
        super(settings)

        // initialise with todos or empty array
        this.todos = this.get('todos') || []
    }

    saveTodos (newTask, index) {
        const todo = {
            text: newTask,
            checked: false,
            id: index || index === 0 ? index : Date.now(),
        };
        this.todos.push(todo)
        console.log(todo)
        // save todos to JSON file
        this.set('todos', this.todos)
    
        // returning 'this' allows method chaining
        return this
      }
    
      getTodos () {
        // set object's todos to todos in JSON file
        this.todos = this.get('todos') || []
    
        return this
      }    
}

module.exports = DataStore