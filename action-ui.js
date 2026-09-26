/* Shared visual treatment for node and canvas actions. Existing handlers stay intact. */
(()=>{
const paths={power:'<path d="M12 3v9M6.3 5.8a9 9 0 1 0 11.4 0"/>',trash:'<path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/>',plus:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 7v10M7 12h10"/>',left:'<path d="m10 5-7 7 7 7M3 12h18"/>',right:'<path d="m14 5 7 7-7 7M3 12h18"/>',focus:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/><rect x="8" y="8" width="8" height="8" rx="2"/>',reset:'<path d="M3 4v6h6M3 10a9 9 0 1 1 1 8"/>',keyboard:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 15h10"/>',node:'<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M1 12h3m16 0h3M9 9l6 3-6 3V9Z"/>',undo:'<path d="m8 4-5 5 5 5M3 9h11a7 7 0 0 1 0 14"/>',redo:'<path d="m16 4 5 5-5 5M21 9H10a7 7 0 0 0 0 14"/>',settings:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/>'};
const icon=name=>'<svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths[name]+'</svg>';
const keys=id=>id?Shortcuts.keys(id).map(Shortcuts.label).join(' / '):'';
function decorate(id,label,symbol,tint,shortcut,description){const el=$(id);if(!el)return;const hotkey=keys(shortcut);const content=icon(symbol)+'<span class="action-label"></span>'+(hotkey?'<kbd></kbd>':'');const signature=content+label+hotkey;if(el.dataset.actionVisual!==signature||!el.querySelector('.action-icon')){el.innerHTML=content;el.querySelector('.action-label').textContent=label;if(hotkey)el.querySelector('kbd').textContent=hotkey;el.dataset.actionVisual=signature;}el.classList.add('visual-action');el.style.setProperty('--action-tint','var(--tool-'+tint+')');el.setAttribute('aria-label',label);el.title=(description||label)+(hotkey?' · '+hotkey:'');}
function syncActions(){
 const nodes=documentSettings.nodes||[],node=nodes.find(n=>n.uid===activeNodeUid),enabled=node?.enabled!==false;
 decorate('nodeBypass',enabled?'Disable':'Enable','power',enabled?'mask':'light','toggleSelectedNode','Enable / disable the selected node');
 $('nodeBypass').setAttribute('aria-pressed',String(!!node&&enabled));
 decorate('nodeRemove','Remove','trash','color','removeSelectedNode','Remove selected node; Undo restores it');
 decorate('nodeAdd','Add node','plus','mask','selectNode2','Add a node. Shortcut selects Node 2, or adds the next node if it is missing');
 decorate('nodeLeft','Earlier','left','detail',null,'Move selected node earlier');
 decorate('nodeRight','Later','right','detail',null,'Move selected node later');
 decorate('reset','Reset','reset','frame',null,'Reset edits in the selected node');
 const focus=document.body.classList.contains('focus-view');
 decorate('focusView',focus?'Exit focus':'Focus','focus','effects','focus','Expand the photo area or restore panels');
 $('focusView')?.setAttribute('aria-pressed',String(focus));
 decorate('undo','Undo','undo','detail','undo');decorate('redo','Redo','redo','detail','redo');
 decorate('workspaceToolHelp','Shortcuts','keyboard','detail',null,'View and customize keyboard shortcuts');
 const context=$('workspaceActiveNode');if(context){context.replaceChildren();const mark=document.createElement('span');mark.className='current-node-icon';mark.innerHTML=icon('node');const text=document.createElement('span');text.className='current-node-copy';const heading=document.createElement('small');heading.textContent=node?'CURRENT EDIT TARGET':'GET STARTED';const name=document.createElement('strong');name.textContent=node?node.label:'Select a photo';text.append(heading,name);context.append(mark,text);if(node){const status=document.createElement('span');status.className='current-node-status';status.textContent=enabled?'Enabled':'Disabled';context.append(status);}context.classList.toggle('node-is-disabled',!!node&&!enabled);}
 for(const b of document.querySelectorAll('#nodeGraph .effect-node')){const n=nodes.find(n=>n.uid===b.dataset.node);if(!n)continue;let mark=b.querySelector('.node-visual-mark');if(!mark){mark=document.createElement('i');mark.className='node-visual-mark';mark.innerHTML=icon('node');b.prepend(mark);}let state=b.querySelector('.node-visual-state');if(!state){state=document.createElement('em');state.className='node-visual-state';b.append(state);}state.textContent=n.enabled===false?'Disabled':n.uid===activeNodeUid?'Editing':'Enabled';b.setAttribute('aria-pressed',String(n.uid===activeNodeUid));const hint=keys('selectNode'+(nodes.indexOf(n)+1));b.title=n.label+' · '+(n.enabled===false?'Disabled':'Enabled')+' · '+(n.mix??100)+'% strength · '+(hint?hint+' to select · ':'')+(keys('renameNode')||'Unassigned')+' to rename while hovered';}
 const summary=$('nodeSetup')?.querySelector('summary');if(summary&&!summary.querySelector('.action-icon'))summary.innerHTML=icon('settings')+'<span>Node settings</span>';
}
window.actionUI={sync:syncActions};
$('focusView')?.addEventListener('click',syncActions);window.addEventListener('shortcutschange',syncActions);syncActions();
})();
