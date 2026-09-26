const {BrowserWindow,ipcMain,screen}=require('electron');
const path=require('node:path');
function setupSecondDisplay(editor){
 let viewer=null,target=null,last=null;
 const displays=()=>screen.getAllDisplays().filter(d=>d.id!==screen.getDisplayMatching(editor.getBounds()).id);
 const status=()=>({active:!!viewer,target,displays:displays().map(d=>({id:d.id,label:d.label||'Display '+d.id,width:d.size.width,height:d.size.height}))});
 const notify=()=>{if(!editor.isDestroyed())editor.webContents.send('second-display-status',status());};
 const close=()=>{viewer?.close();};
 ipcMain.handle('second-display-status',event=>{if(event.sender!==editor.webContents)throw Error('Invalid window');return status();});
 ipcMain.handle('second-display-open',async(event,id)=>{
  if(event.sender!==editor.webContents)throw Error('Invalid window');
  const display=displays().find(d=>d.id===id);if(!display)throw Error('Connect another monitor first.');
  close();target=id;
  const window=new BrowserWindow({...display.bounds,show:false,backgroundColor:'#202020',title:'Lith · Photo display',autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'second-display-preload.cjs'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
  viewer=window;window.webContents.setWindowOpenHandler(()=>({action:'deny'}));window.webContents.on('will-navigate',e=>e.preventDefault());
  window.on('closed',()=>{if(viewer===window){viewer=null;target=null;last=null;notify();}});
  await window.loadFile(path.join(__dirname,'second-display.html'));
  if(window.isDestroyed())return status();window.setBounds(display.bounds);window.show();window.setFullScreen(true);editor.focus();notify();return status();
 });
 ipcMain.handle('second-display-close',event=>{if(event.sender===editor.webContents||event.sender===viewer?.webContents)close();});
 ipcMain.on('second-display-frame',(event,state)=>{if(event.sender!==editor.webContents||!viewer)return;last=state;viewer.webContents.send('second-display-frame',last);});
 const changed=()=>{if(viewer&&!displays().some(d=>d.id===target))close();notify();};
 screen.on('display-added',changed);screen.on('display-removed',changed);screen.on('display-metrics-changed',changed);editor.on('move',changed);
 editor.on('closed',()=>{close();screen.removeListener('display-added',changed);screen.removeListener('display-removed',changed);screen.removeListener('display-metrics-changed',changed);});
}
module.exports={setupSecondDisplay};
