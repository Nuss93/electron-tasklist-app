'use strict';

const path = require('path')
const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron');

const DataStore = require('./DataStore');

const todosData = new DataStore({ name: 'Todos Main' })

function createWindow() {
  const win = new BrowserWindow({
    height: 800,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false
    }
  });

  win.loadFile('index.html');
  win.webContents.openDevTools();

  win.once('show', () => {
    // win.webContents.send('todos', todosData.todos)
    ipcRenderer.send('get-todos')
    console.log('aaa', win.webContents)
  })

  ipcMain.on('get-todos', (event, todo) => {
    const todos = todosData.getTodos()
    // console.log('here', new Date().getTime(), todos)
  })

  ipcMain.on('add-todos', (event, todo) => {
    const todos = todosData.saveTodos(todo)
  })
}

// app.whenReady().then(() => {
//   createWindow()
//   console.log('sini')

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow();
//     }
//   });
// });

// app.once('show', () =>{
//   console.log('show')
//   app.webContents.send('todos', todosData.todos)
// })

app.on('ready', () =>{
  // console.log('===============================')
  // console.log('ready', new Date().toLocaleTimeString())
  // console.log('===============================')
  
  // const getTodos = todosData.getTodos()
  // console.log('getData', new Date().toTimeString(), getTodos.todos)
  // console.log('===============================')

  // ipcr.send('todos', todosData.todos)
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

