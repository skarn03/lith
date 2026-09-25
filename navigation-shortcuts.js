(()=>{
for(let i=1;i<=9;i++){
 const tabs=[...document.querySelectorAll('[data-tool]')],tab=tabs[i-1];
 Shortcuts.register('developTab'+i,tab?'Open '+tab.dataset.tool.replace(/^./,c=>c.toUpperCase()):'Develop tab '+i+' (reserved)','Develop',[String(i)],()=>{const target=document.querySelectorAll('[data-tool]')[i-1];if(target)window.advancedUI.setTool(target.dataset.tool);},()=>!!img&&!!document.querySelectorAll('[data-tool]')[i-1]);
 Shortcuts.register('selectNode'+i,'Select node '+i+' / add next node','Nodes',['mod+'+i],()=>{const existing=documentSettings.nodes[i-1];if(existing){window.nodeUI.choose(existing.uid);save();}else{$('nodeAdd').click();save();}},()=>!!img);
}
Shortcuts.register('toggleSelectedNode','Enable / disable selected node','Nodes',['mod+d'],()=>$('nodeBypass').click(),()=>!!img);
$('nodeBypass').title='Enable / disable selected node (Ctrl/Command+D)';
Shortcuts.register('removeSelectedNode','Remove selected node','Nodes',['mod+backspace'],()=>$('nodeRemove').click(),()=>!!img&&documentSettings.nodes.length>1);
let busy=false;
const active=()=>document.body.classList.contains('fullscreen-preview');
const exitButton=document.createElement('button');exitButton.id='exitPhotoPreview';exitButton.textContent='✕ Exit preview · Esc';exitButton.hidden=true;document.body.append(exitButton);
async function exit(){if(busy)return;busy=true;try{await api.fullscreen(false);document.body.classList.remove('fullscreen-preview');exitButton.hidden=true;requestAnimationFrame(layout);}catch(e){fail(e);}finally{busy=false;}}
async function toggle(){if(busy)return;if(active())return exit();busy=true;try{await api.fullscreen(true);setMode('edit');document.body.classList.add('fullscreen-preview');exitButton.hidden=false;zoom=0;requestAnimationFrame(layout);}catch(e){fail(e);}finally{busy=false;}}
exitButton.onclick=exit;window.previewUI={active,exit};
Shortcuts.register('fullscreenPreview','Fullscreen photo preview','View',['mod+f'],toggle,()=>!!img);
function hints(){$('nodeBypass').title='Enable / disable selected node · '+Shortcuts.keys('toggleSelectedNode').map(Shortcuts.label).join(' / ');document.querySelectorAll('[data-tool]').forEach((b,i)=>{const keys=Shortcuts.keys('developTab'+(i+1)).map(Shortcuts.label).join(' / ');b.title=b.dataset.tool+(keys?' ('+keys+')':'');});}
window.addEventListener('shortcutschange',hints);hints();
})();
