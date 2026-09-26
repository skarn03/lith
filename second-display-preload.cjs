const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('displayAPI',{
 effectAsset:(id,raw=false)=>ipcRenderer.invoke('effect-asset-image',id,raw),
 image:(id,raw)=>ipcRenderer.invoke('image',id,raw),rawData:(id,raw)=>ipcRenderer.invoke('raw-data',id,raw),
 close:()=>ipcRenderer.invoke('second-display-close'),
 onFrame:callback=>ipcRenderer.on('second-display-frame',(_,state)=>callback(state))
});
