const { resolve } = require('path');
const { app, Menu, Tray, dialog  } = require('electron')
const { execFile } = require('child_process');
const Sentry = require("@sentry/electron")

Sentry.init({ dsn: "https://63c6f61d9742432d9b91935fb6869f53@o470361.ingest.sentry.io/5500869" });

const Store = require('electron-store');
const store = new Store();
const contextItems = [
  { label: 'Configurar Fivem', type: 'normal', click: async () => {
    const result = await dialog.showOpenDialog({ properties: ['openFile'] })
    if(!result) return
    
    const [fivemExe] = result.filePaths
    
    store.set('fivemExe', fivemExe);
},}]

const fivemExe = store.get('fivemExe')

if(store.get('fivemExe')) {
  contextItems.push({ label: 'Connectar ao servidor', type: 'normal', click: () => {
    execFile(fivemExe, ['+connect', 'raizesrp.city'], {shell: true});
  }})
}

let tray = null
app.whenReady().then(() => {
  tray = new Tray(resolve(__dirname, 'assets', 'icon.png'))
  
  const contextMenu = Menu.buildFromTemplate(contextItems)
  tray.setToolTip('This is my fivem server')
  tray.setContextMenu(contextMenu)
})
