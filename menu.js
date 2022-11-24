const { app, Menu, shell, BrowserWindow, globalShortcut, ipcMain, dialog } = require('electron');

const fs = require('fs');

const { open_file, save_file } = require('./editor-options');

const template = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Abrir',
                accelerator: 'CommandOrControl+O',
                click(){
                    const win = BrowserWindow.getFocusedWindow()                  
                    open_file(win)                    
                }
            },
            {
                label: 'Guardar',
                accelerator: 'CommandOrControl+S',
                click(){
                    const win = BrowserWindow.getFocusedWindow()
                    win.webContents.send('editor-channel', 'file-save')    
                }
            }
        ]
    },    
    {
        label: 'Estilos',
        submenu: [
            {
                label: 'Fuentes',
                submenu: [
                    {
                        label: 'Sans-serif',
                        submenu: [
                            {
                                label: "Helvetica",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'Helvetica')
                                }
                            },
                            {
                                label: "Arial",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'Arial')
                                }
                            },
                            {
                                label: "Arial black",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'arial black')
                                }
                            },
                            {
                                label: "Verdana",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'verdana')
                                }
                            },
                            {
                                label: "Trebuchet MS",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'trebuchet ms')
                                }
                            },
                            {
                                label: "Impact",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'impact')
                                }
                            }
                        ]
                    },
                    {
                        label: 'Serif',
                        submenu: [
                            {
                                label: "Times New Roman",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'Times New Roman')
                                }
                            },
                            {
                                label: "Georgia",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'Georgia')
                                }
                            }
                        ]
                    },
                    {
                        label: 'Monospace',
                        submenu: [
                            {
                                label: "Andalé Mono",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'andale mono')
                                }
                            },
                            {
                                label: "Courier",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'courier')
                                }
                            }
                        ]
                    },
                    {
                        label: 'Fantasy',
                        submenu: [
                            {
                                label: "Comic Sans MS",
                                click() {
                                    const win = BrowserWindow.getFocusedWindow()
                                    win.webContents.send('font-family', 'comic sans ms')
                                }
                            },
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'About',
        click(){
            const options = {                
                defaultId: 2,
                title: 'Acerca de ...',
                message: 'Thanks for using it !',
                detail: 'Made by: Poul Lorca \n Github: https://github.com/PoulLorca',                
              }

            dialog.showMessageBox(null, options)            
        }
    },    
]


if (process.env.DEBUG) {
    template.push(
        {
            label: 'Debuggin',
            submenu: [
                {
                    role: 'toggleDevTools'
                },
                {
                    role: 'reload',
                    accelerator: 'Alt+C'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'quit'
                }
            ]
        }
    )
}

ipcMain.on('editor-channel', (event, arg) => {    
    const win = BrowserWindow.getFocusedWindow()
    save_file(win,arg)    
})

ipcMain.on('file-open',(event, arg) => {
    const win = BrowserWindow.getFocusedWindow()
    open_file(win)
})

ipcMain.on('file-save',(event, arg) => {
    console.log("Mensaje recibido del canal 'editor-channel': "+arg)
    const win = BrowserWindow.getFocusedWindow()
    save_file(win, arg)
})

app.on('ready', () => {
    globalShortcut.register('CommandOrControl+S', () => {
        const win = BrowserWindow.getFocusedWindow()
        win.webContents.send('editor-channel','file-save')        
    })

    globalShortcut.register('CommandOrControl+O', () => {
         const win = BrowserWindow.getFocusedWindow()                  
         open_file(win);
    })
})

const menu = Menu.buildFromTemplate(template)

module.exports = menu