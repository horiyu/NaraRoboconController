const { app, Menu, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

var devTools_judge = 0;

let win;

function createWindow() {
    win = new BrowserWindow({width: 600, height: 800, 'fullscreen': true, 'frame': false, useContentSize: true,
    webPreferences: {
        nodeIntegration: true //window.$ = window.jQuery = require('jquery');
    }});

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // if (devTools_judge) {
    //   win.webContents.closeDevTools();
    // }else{
    //   // 開発ツールを有効化
      // win.webContents.openDevTools();
    // }

    //Electronのデフォルトメニュー
    Menu.setApplicationMenu(null);

    win.on('closed', () => {
        win = null;
    });
}

function devTools_select() {
  var devTools_pass = document.getElementById("pass").value;
  if (devTools_pass == "horiyu") devTools_judge = 1;
  else                           devTools_judge = 0;
  if (devTools_judge) {
    // win.webContents.openDevTools();
  }else{

  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});

app.allowRendererProcessReuse = false;


// localshortcut.register(win, 'Ctrl+Q', function() {
//   app.quit();
// });


// document.addEventListener('keydown', (event) => {
//   document.onkeydown = function (event){
//   	if(!event) event = window.event;
//
//   	if(event.keyCode == 46){
//       app.quit();
//   	}
//   };
// });
