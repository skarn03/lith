const fs=require('node:fs/promises'),path=require('node:path'),crypto=require('node:crypto');
function setup({ipcMain,getCatalog,persist,root,chooseExportFolder}){
 const exports=new Map();
 ipcMain.handle('batch-save',async(_,request)=>{
  const catalog=getCatalog(),updates=request.updates;
  if(!Array.isArray(updates)||!updates.length||updates.length>1000||new Set(updates.map(u=>u.id)).size!==updates.length)throw Error('Choose between 1 and 1,000 photos.');
  const changes=updates.map(u=>{const photo=catalog.photos.find(p=>p.id===u.id&&p.projectId===request.projectId);if(!photo||JSON.stringify(photo.settings)!==u.expected)throw Error('A selected photo changed. Reopen Batch sync to avoid replacing newer edits.');if(!u.settings||typeof u.settings!=='object'||(u.settings.nodes!==undefined&&!Array.isArray(u.settings.nodes)))throw Error('Invalid edit settings.');return {photo,before:photo.settings,after:structuredClone(u.settings)};});
  changes.forEach(c=>c.photo.settings=c.after);
  try{await persist();}catch(e){for(const c of changes)if(c.photo.settings===c.after)c.photo.settings=c.before;throw e;}
  return changes.map(c=>({id:c.photo.id,settings:c.after}));
 });
 ipcMain.handle('batch-export-begin',async(event,request)=>{
  const catalog=getCatalog(),project=catalog.projects.find(p=>p.id===request.projectId);
  if(!project||!['jpeg','png','webp'].includes(request.format)||!Array.isArray(request.ids)||!request.ids.length||request.ids.length>1000)throw Error('Invalid batch export.');
  if(exports.size)throw Error('Another batch export is already running.');
  const photos=request.ids.map(id=>{const p=catalog.photos.find(p=>p.id===id&&p.projectId===project.id);if(!p)throw Error('A selected photo moved to another project.');return {id:p.id,name:p.name};});
  const folder=project.exportFolder||await chooseExportFolder(project.id);if(!folder)return null;
  const real=await fs.realpath(folder),library=await fs.realpath(root);
  if(real.toLowerCase()===library.toLowerCase()||real.toLowerCase().startsWith(library.toLowerCase()+path.sep))throw Error('Choose an export folder outside the photo library.');
  const token=crypto.randomUUID(),clear=()=>{const session=exports.get(token);if(session){session.sender?.removeListener('did-start-loading',clear);session.sender?.removeListener('render-process-gone',clear);exports.delete(token);}};event.sender?.once('did-start-loading',clear);event.sender?.once('render-process-gone',clear);exports.set(token,{folder:real,photos,format:request.format,sender:event.sender,clear});return {token,folder:real};
 });
 ipcMain.handle('batch-export-write',async(_,request)=>{
  const session=exports.get(request.token),photo=session?.photos.find(p=>p.id===request.id);
  if(!photo||!(request.bytes instanceof Uint8Array||request.bytes instanceof ArrayBuffer))throw Error('Invalid batch export session.');
  const stem=path.basename(photo.name).replace(/\.[^.]+$/,'').replace(/[<>:"/\\|?*\x00-\x1f]/g,'_').slice(0,120)||'Photo',ext=session.format==='jpeg'?'jpg':session.format;
  for(let i=0;i<10000;i++){const file=path.join(session.folder,stem+'-edited'+(i?' ('+(i+1)+')':'')+'.'+ext);try{await fs.writeFile(file,Buffer.from(request.bytes),{flag:'wx'});return file;}catch(e){if(e.code!=='EEXIST')throw e;}}
  throw Error('Too many exports with this name.');
 });
 ipcMain.handle('batch-export-end',(_,token)=>exports.get(token)?.clear());
}
module.exports={setup};
