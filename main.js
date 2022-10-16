'use strict';

const { app, BrowserWindow } = require('electron');
const electronReload = require('electron-reload')

function createWindow() {
  const win = new BrowserWindow({
    height: 800,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    //   enableRemoteModule: true
    },
    
    // icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
    // title: 'My App',
  });

  // win.setTitle('My App');
  win.loadFile('index.html');
  
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

