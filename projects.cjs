const crypto=require('node:crypto');
const defaults=()=>({format:'jpeg',quality:100,size:0,notes:'',sharpening:{mode:'off',amount:'standard'}});
function normalize(c){
 c.projects=c.projects?.length?c.projects:[{id:crypto.randomUUID(),name:'My photographs',settings:defaults(),selected:c.selected||null}];
 for(const project of c.projects){project.settings={...defaults(),...project.settings};if(!c.exportQualityV2)project.settings.quality=100;}c.exportQualityV2=true;
 const ids=new Set(c.projects.map(p=>p.id));
 for(const photo of c.photos)if(!ids.has(photo.projectId))photo.projectId=c.projects[0].id;
 if(!ids.has(c.activeProjectId))c.activeProjectId=c.projects[0].id;
 c.selected=c.projects.find(p=>p.id===c.activeProjectId).selected||null;
 return c;
}
function project(c,id){const p=c.projects.find(p=>p.id===id);if(!p)throw Error('Project not found');return p;}
function settings(value){return {format:['jpeg','png','webp'].includes(value.format)?value.format:'jpeg',quality:Math.max(10,Math.min(100,Number(value.quality)||100)),size:[0,1080,2048,3840].includes(Number(value.size))?Number(value.size):0,notes:String(value.notes||'').slice(0,2000),sharpening:{mode:['screen','print'].includes(value.sharpening?.mode)?value.sharpening.mode:'off',amount:['low','standard','high'].includes(value.sharpening?.amount)?value.sharpening.amount:'standard'}};}
module.exports={normalize,project,settings,defaults};
