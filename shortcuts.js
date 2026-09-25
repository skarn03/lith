window.Shortcuts=(()=>{
const actions=new Map(),storageKey='lith.shortcuts.v1';let overrides={};try{const value=JSON.parse(localStorage.getItem(storageKey)||'{}');if(value&&typeof value==='object'&&!Array.isArray(value))overrides=value;}catch{}
// These keys now belong to Develop tabs, nodes and fullscreen preview.
if(localStorage.getItem('lith.shortcuts.layout')!=='2'){
 const reserved=new Set(['mod+f',...Array.from({length:9},(_,i)=>String(i+1)),...Array.from({length:9},(_,i)=>'mod+'+(i+1))]);
 const next={...overrides};for(const [id,value]of Object.entries(next))if(Array.isArray(value)&&value.some(k=>reserved.has(k)))next[id]=value.filter(k=>!reserved.has(k));
 try{localStorage.setItem(storageKey,JSON.stringify(next));localStorage.setItem('lith.shortcuts.layout','2');overrides=next;}catch{}
}
if(!localStorage.getItem('lith.shortcuts.quickSave')){
 const next={...overrides};for(const [id,value]of Object.entries(next))if(id!=='quickSave'&&Array.isArray(value)&&value.includes('mod+s'))next[id]=value.filter(k=>k!=='mod+s');
 try{localStorage.setItem(storageKey,JSON.stringify(next));localStorage.setItem('lith.shortcuts.quickSave','1');overrides=next;}catch{}
}
const mac=/Mac/.test(navigator.platform);
function key(e){let k=e.key.toLowerCase();if(['control','meta','alt','shift','dead','unidentified'].includes(k))return '';if(k===' ')k='space';return [(e.ctrlKey||e.metaKey)?'mod':'',e.altKey?'alt':'',e.shiftKey&&(k.length>1||/[a-z0-9]/.test(k))?'shift':'',k].filter(Boolean).join('+');}
function keys(id){const a=actions.get(id),v=overrides[id];return Array.isArray(v)&&v.every(k=>typeof k==='string')?v:a?.defaults||[];}
function label(k){return k.split('+').map(k=>({mod:mac?'⌘':'Ctrl',alt:mac?'Option':'Alt',shift:'Shift',arrowleft:'←',arrowright:'→',arrowup:'↑',arrowdown:'↓',escape:'Esc',space:'Space'}[k]||k.charAt(0).toUpperCase()+k.slice(1))).join(' + ');}
function persist(next){localStorage.setItem(storageKey,JSON.stringify(next));overrides=next;window.dispatchEvent(new Event('shortcutschange'));}
function assign(id,value){const conflict=[...actions.values()].find(a=>a.id!==id&&keys(a.id).some(k=>value.includes(k)));if(conflict)throw Error('Already assigned to '+conflict.label+'. Clear or change that shortcut first.');persist({...overrides,[id]:value});}
document.addEventListener('keydown',e=>{if(e.defaultPrevented||e.repeat||e.isComposing||e.target.closest('input,select,textarea,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;const combination=key(e);for(const a of actions.values()){if(!keys(a.id).includes(combination)||a.when&&!a.when(e))continue;e.preventDefault();Promise.resolve(a.run(e)).catch(error=>window.console.error(error));break;}});
return {register(id,label,group,defaults,run,when){actions.set(id,{id,label,group,defaults,run,when});},actions,keys,key,label,assign,reset(id){assign(id,actions.get(id).defaults);},resetAll(){persist({});}};
})();
