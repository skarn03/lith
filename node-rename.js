(()=>{
let hovered=null,renameId=null;
const selector='.effect-node[data-node],#nodeTargets [data-target]';
document.addEventListener('pointermove',e=>{const card=e.target.closest(selector);hovered=card?.dataset.node||card?.dataset.target||null;});document.addEventListener('pointerleave',()=>hovered=null);
const dialog=document.createElement('dialog');dialog.id='renameNodeDialog';dialog.innerHTML='<form id="renameNodeForm"><div class="dialog-top"><strong>Rename node</strong><button type="button" id="cancelNodeRename" aria-label="Cancel rename">✕</button></div><label>Node name<input id="renameNodeName" maxlength="60" required autocomplete="off"></label><button class="primary" type="submit">Save name</button><p class="small muted">Enter to save · Escape to cancel</p></form>';document.body.append(dialog);
$('renameNodeName').style.cssText='display:block;width:100%;margin-top:10px;padding:10px;background:var(--surface-2);color:var(--text);border:1px solid var(--line);border-radius:5px';
$('cancelNodeRename').onclick=()=>dialog.close();
$('renameNodeForm').onsubmit=e=>{e.preventDefault();const n=documentSettings.nodes.find(n=>n.uid===renameId),value=$('renameNodeName').value.trim();if(!n||!value)return;mutate(()=>n.label=value);dialog.close();};
document.addEventListener('keydown',e=>{if(e.key.toLowerCase()!=='r'||e.repeat||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,textarea,select,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;const focused=e.target.closest(selector),id=hovered||focused?.dataset.node||focused?.dataset.target,n=documentSettings.nodes.find(n=>n.uid===id);if(!img||!n)return;e.preventDefault();renameId=n.uid;$('renameNodeName').value=n.label;dialog.showModal();$('renameNodeName').focus();$('renameNodeName').select();});
const help=$('shortcutHelp')?.querySelector('dl');if(help){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent='R over a node';dd.textContent='Rename hovered node';help.append(dt,dd);}
})();
