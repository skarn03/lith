(()=>{
'use strict';
let pending=null;
const bar=document.createElement('div');bar.id='lookPreviewBar';bar.hidden=true;
bar.innerHTML='<span id="lookPreviewName" role="status"></span><label>Strength <input id="lookPreviewAmount" aria-label="Preview look strength" type="range" min="0" max="100" value="100"><output id="lookPreviewAmountValue">100%</output></label><button id="applyPreviewLook" class="primary">Apply look</button><button id="cancelPreviewLook">Cancel</button>';
document.querySelector('.canvas-tools').before(bar);
function valid(){return pending&&pending.photo===current?.id&&pending.node===activeNodeUid&&documentSettings.nodes.some(n=>n.uid===pending.node);}
function sync(){if(!valid())pending=null;bar.hidden=!pending;for(const b of document.querySelectorAll('.preset')){const selected=!!pending&&Number(b.dataset.lookId)===pending.id;b.classList.toggle('previewing-look',selected);b.dataset.previewing=String(selected);}if(!pending)return;$('lookPreviewName').textContent='Preview only · '+looks[pending.id][0];$('lookPreviewAmount').disabled=!pending.id;$('lookPreviewAmount').value=pending.amount;$('lookPreviewAmountValue').textContent=pending.amount+'%';}
function choose(id){if(!img||!looks[id]||!documentSettings.nodes.some(n=>n.uid===activeNodeUid))return;const applied=documentSettings.nodes.find(n=>n.uid===activeNodeUid)?.looks?.find(l=>l.id===id);pending={id,photo:current.id,node:activeNodeUid,amount:applied?.amount??100};sync();render();}
function write(node){if(!pending.id){for(const l of node.looks||[])l.enabled=false;return;}node.looks||=[];let l=node.looks.find(l=>l.id===pending.id);if(!l){l={id:pending.id,name:looks[pending.id][0],values:structuredClone(looks[pending.id][2])};node.looks.push(l);}l.enabled=true;l.amount=pending.amount;}
function snapshot(s){if(!valid())return s;const node=s.nodes.find(n=>n.uid===pending.node);if(node)write(node);return s;}
function cancel(){pending=null;sync();render();}
$('lookPreviewAmount').oninput=()=>{if(!valid())return;pending.amount=Number($('lookPreviewAmount').value);$('lookPreviewAmountValue').textContent=pending.amount+'%';scheduleRender();};
$('applyPreviewLook').onclick=()=>{if(!valid()){sync();return;}mutate(()=>{write(documentSettings.nodes.find(n=>n.uid===pending.node));pending=null;});sync();};
$('cancelPreviewLook').onclick=cancel;
window.lookPreviewUI={choose,snapshot,sync,cancel};
})();
