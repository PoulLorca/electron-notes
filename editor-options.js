const {dialog} = require('electron');

const fs = require('fs');

module.exports.open_file = function(win) {
    const option = {
        title: 'Abrir archivo',
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt', 'docx']
            },
        ]
    }

    paths = dialog.showOpenDialogSync(win, option)

    if (paths) {
        let fileName = paths.toString().split('/').at(-1)        
        win.webContents.send('document-name', fileName);

        const content = fs.readFileSync(paths[0]).toString()
        win.webContents.send('file-open', content);                
    }

}

module.exports.save_file = function(win, data) {
    const option = {
        title: 'Guardar archivo',
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt', 'docx']
            },
        ]
    }

    path = dialog.showSaveDialogSync(win, option)
    if (path) {
        fs.writeFileSync(path, data);
    }
    /*dialog.showSaveDialog(win, option).then(result =>{
        console.log(result.canceled);
        console.log(result.filePaths);
    })*/

}