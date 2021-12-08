const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')
const url = require('url');


let win
function createWindow () {

    win = new BrowserWindow({
        width: 700,
        height: 500,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }

    })




    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))
    win.webContents.openDevTools()


    win.on('closed', () => {
        win = null
    })
}
app.on('ready', createWindow);




ipcMain.on('message', (event, data) =>{
    console.log(data)
    event.reply('reply-message', 'pong');
})
