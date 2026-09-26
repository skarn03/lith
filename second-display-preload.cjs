const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('displayAPI',{
 effectAsset:(id,raw=false)=>ipcRenderer.invoke('effect-asset-image',id,raw),
 image:id=>ipcRenderer.invoke('image',id),rawData:id=>ipcRenderer.invoke('raw-data',id),
 close:()=>ipcRenderer.invoke('second-display-close'),
 onFrame:callback=>ipcRenderer.on('second-display-frame',(_,state)=>callback(state))
});
