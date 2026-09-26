(()=>{
'use strict';
const root=document.querySelector('.workspace-redesign'),key='lith.workspace.sizes.v1';
if(!root)return;
let sizes={},frame=0;
try{sizes=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
const docks=Object.fromEntries([...root.querySelectorAll('.workspace-dock')].map(d=>[d.dataset.dock,d]));
const valid=n=>Number.isFinite(n)&&n>0;
const save=()=>{try{localStorage.setItem(key,JSON.stringify(sizes));}catch{}};
function apply(){
 const available=Math.max(0,root.clientWidth-280),left=valid(sizes.left)?sizes.left:(innerWidth<=1150?190:224),right=valid(sizes.right)?sizes.right:(innerWidth<=1150?292:320);
 const scale=Math.min(1,available/(left+right));
 root.style.setProperty('--workspace-left',Math.round(left*scale)+'px');
 root.style.setProperty('--workspace-right',Math.round(right*scale)+'px');
 for(const zone of ['top','bottom']){const d=docks[zone];d.style.height=valid(sizes[zone])?Math.min(sizes[zone],root.clientHeight*.4)+'px':'';d.classList.toggle('dock-sized',valid(sizes[zone]));}
 for(const p of root.querySelectorAll('.workspace-panel')){const n=sizes.panels?.[p.dataset.panel];p.style.flex=valid(n)?n+' 1 0px':'';}
 schedule();
}
function handle(label,orientation,start,change,reset){
 const h=document.createElement('div');h.className='workspace-resizer '+orientation;h.tabIndex=0;h.setAttribute('role','separator');h.setAttribute('aria-label',label);h.setAttribute('aria-orientation',orientation==='vertical'?'vertical':'horizontal');h.title=label+' · drag or use arrow keys · double-click to reset';
 h.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();const origin=orientation==='vertical'?e.clientX:e.clientY,initial=start();h.setPointerCapture(e.pointerId);document.body.classList.add('workspace-resizing');const move=e=>change(initial,(orientation==='vertical'?e.clientX:e.clientY)-origin);const end=()=>{h.removeEventListener('pointermove',move);h.removeEventListener('pointerup',end);h.removeEventListener('pointercancel',end);document.body.classList.remove('workspace-resizing');save();};h.addEventListener('pointermove',move);h.addEventListener('pointerup',end);h.addEventListener('pointercancel',end);});
 h.addEventListener('keydown',e=>{const keys=orientation==='vertical'?['ArrowLeft','ArrowRight']:['ArrowUp','ArrowDown'];if(!keys.includes(e.key))return;e.preventDefault();e.stopPropagation();change(start(),(e.key===keys[0]?-1:1)*(e.shiftKey?40:10));save();});
 h.addEventListener('dblclick',e=>{e.preventDefault();reset();save();apply();});return h;
}
const handles={};
for(const zone of ['left','right','top','bottom']){
 const horizontal=['top','bottom'].includes(zone),sign=['right','bottom'].includes(zone)?-1:1;
 const h=handle('Resize '+zone+' workspace area',horizontal?'horizontal':'vertical',()=>docks[zone].getBoundingClientRect()[horizontal?'height':'width'],(initial,delta)=>{
  const other=docks[zone==='left'?'right':'left'].getBoundingClientRect().width,max=horizontal?root.clientHeight*.4:root.clientWidth-other-280;
  sizes[zone]=Math.max(horizontal?70:170,Math.min(max,initial+delta*sign));apply();
 },()=>delete sizes[zone]);h.dataset.resizeDock=zone;root.append(h);handles[zone]=h;
}
function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(position);}
function position(){
 const r=root.getBoundingClientRect();
 for(const [zone,h]of Object.entries(handles)){const d=docks[zone],b=d.getBoundingClientRect(),vertical=['left','right'].includes(zone);h.hidden=!d.children.length||!b.width||!b.height;if(vertical){h.style.cssText=`left:${(zone==='left'?b.right:b.left)-r.left-4}px;top:${b.top-r.top}px;width:8px;height:${b.height}px`;}else{h.style.cssText=`left:${b.left-r.left}px;top:${(zone==='top'?b.bottom:b.top)-r.top-4}px;width:${b.width}px;height:8px`;}}
 for(const d of Object.values(docks)){const expanded=[...d.children].filter(p=>!p.hidden&&!p.classList.contains('panel-collapsed'));for(const p of d.children){let h=p.querySelector(':scope > .panel-size-handle');if(!h){h=handle('Resize '+p.getAttribute('aria-label'),d.classList.contains('dock-horizontal')?'vertical':'horizontal',()=>{const list=[...d.children].filter(p=>!p.hidden&&!p.classList.contains('panel-collapsed')),index=list.indexOf(p),next=list[index+1];return {list,next,heights:list.map(p=>p.getBoundingClientRect()[d.classList.contains('dock-horizontal')?'width':'height'])};},(initial,delta)=>{
    if(!initial.next)return;const i=initial.list.indexOf(p),j=i+1,total=initial.heights[i]+initial.heights[j],first=Math.max(70,Math.min(total-70,initial.heights[i]+delta));sizes.panels||={};initial.list.forEach((panel,n)=>sizes.panels[panel.dataset.panel]=n===i?first:n===j?total-first:initial.heights[n]);apply();
   },()=>{for(const panel of d.children)delete sizes.panels?.[panel.dataset.panel];});h.classList.add('panel-size-handle');p.append(h);}h.hidden=p.classList.contains('panel-collapsed')||expanded.at(-1)===p;}}
}
// Rebinding panel handles after docking keeps their resize partners in the same area.
const observer=new MutationObserver(records=>{if(records.some(r=>(r.type==='childList'||r.attributeName==='class')&&r.target.classList?.contains('workspace-dock'))){root.querySelectorAll('.panel-size-handle').forEach(h=>h.remove());apply();}else schedule();});
for(const d of Object.values(docks))observer.observe(d,{childList:true,attributes:true,subtree:false});
const resize=new ResizeObserver(schedule);resize.observe(root);for(const d of Object.values(docks))resize.observe(d);
root.addEventListener('click',schedule);window.addEventListener('resize',apply);
document.getElementById('workspaceReset').addEventListener('click',()=>{sizes={};save();apply();});
apply();
})();
