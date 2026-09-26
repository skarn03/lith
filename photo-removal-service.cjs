const crypto=require('node:crypto');
function setup({ipcMain,getCatalog,persist}){
 ipcMain.handle('remove-photos',async(_,request)=>{
  const catalog=getCatalog(),project=catalog.projects.find(p=>p.id===request?.projectId);if(!project)throw Error('Project not found.');
  const ids=request.ids;if(!Array.isArray(ids)||!ids.length||ids.length>1000||new Set(ids).size!==ids.length)throw Error('Choose between 1 and 1,000 photo versions.');
  const chosen=ids.map(id=>catalog.photos.find(p=>p.id===id&&p.projectId===project.id));if(chosen.some(p=>!p))throw Error('A selected photo moved or was removed. Select the photos again.');
  const token=crypto.randomUUID(),removed=new Set(ids),previousSelected=project.selected;
  catalog.removedPhotos||=[];const entries=chosen.map(photo=>({token,removedAt:Date.now(),photo}));catalog.removedPhotos.push(...entries);catalog.photos=catalog.photos.filter(p=>!removed.has(p.id));if(removed.has(project.selected))project.selected=catalog.photos.find(p=>p.projectId===project.id)?.id||null;if(catalog.activeProjectId===project.id)catalog.selected=project.selected;
  try{await persist();}catch(e){catalog.photos.push(...chosen);catalog.removedPhotos=catalog.removedPhotos.filter(e=>e.token!==token);project.selected=previousSelected;if(catalog.activeProjectId===project.id)catalog.selected=previousSelected;throw e;}
  return {catalog,token};
 });
 ipcMain.handle('restore-photos',async(_,token)=>{
  const catalog=getCatalog(),entries=(catalog.removedPhotos||[]).filter(e=>e.token===token);if(!entries.length)throw Error('These photos cannot be restored.');
  if(entries.some(e=>!catalog.projects.some(p=>p.id===e.photo.projectId)||catalog.photos.some(p=>p.id===e.photo.id)))throw Error('Cannot restore these versions into the project.');
  catalog.photos.push(...entries.map(e=>e.photo));catalog.removedPhotos=catalog.removedPhotos.filter(e=>e.token!==token);
  try{await persist();}catch(e){const ids=new Set(entries.map(e=>e.photo.id));catalog.photos=catalog.photos.filter(p=>!ids.has(p.id));catalog.removedPhotos.push(...entries);throw e;}return catalog;
 });
}
module.exports={setup};
