function setup({win,app,dialog,saveMain}){
 let busy=false,approved=false;
 async function finish(restart=false){if(busy||approved)return;busy=true;try{
  let timer;try{await Promise.race([win.webContents.executeJavaScript('Promise.resolve().then(async()=>{if(typeof flush === "function")await flush();if(window.exportQueue?.persist)await exportQueue.persist();})'),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('The editing window did not respond within 10 seconds.')),10000);})]);}finally{clearTimeout(timer);}
  await saveMain();approved=true;if(restart){app.relaunch();app.exit(0);}else win.close();
 }catch(e){const answer=await dialog.showMessageBox(win,{type:'warning',message:'Lith is taking too long to respond.',detail:'Your previously saved edits are on disk. The latest unsaved changes or queue changes may be lost if you force '+(restart?'restart.':'close.')+'\n\n'+e.message,buttons:['Keep Lith open',restart?'Force restart':'Force close'],defaultId:0,cancelId:0});if(answer.response===1){await saveMain().catch(()=>{});approved=true;if(restart){app.relaunch();app.exit(0);}else win.destroy();}}finally{busy=false;}}
 win.on('close',e=>{if(approved)return;e.preventDefault();void finish(false);});
 win.webContents.on('before-input-event',(event,input)=>{if(input.type==='keyDown'&&!input.alt&&(input.control||input.meta)&&input.key.toLowerCase()==='r'){event.preventDefault();void finish(true);}});
 return {approve:()=>approved=true};
}
module.exports={setup};
