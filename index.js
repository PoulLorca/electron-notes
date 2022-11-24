const { Menu, app, BrowserWindow } = require("electron")
const fs  = require("fs");

const menu = require("./menu");

function createWindow() {
    let win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    //win.webContents.openDevTools();

    win.loadFile('./index.html');    
}

app.whenReady().then(() => {
    createWindow();
})

Menu.setApplicationMenu(menu);