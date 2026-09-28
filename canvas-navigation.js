(()=>{
const stage=$('stage');let space=false,control=false,inside=false,drag=null,timer;
const typing=target=>target?.closest?.('input,textarea,select,[contenteditable="true"]');
function cursor(){stage.classList.toggle('navigation-ready',inside&&(space||control));stage.classList.toggle('navigation-dragging',!!drag);}
function end(){if(drag){try{stage.releasePointerCapture(drag.id);}catch{}drag=null;}cursor();}
function refine(){clearTimeout(timer);timer=setTimeout(()=>{if(img)render(false,true);},160);}
stage.addEventListener('pointerenter',()=>{inside=true;cursor();});stage.addEventListener('pointerleave',()=>{inside=false;cursor();});
window.addEventListener('keydown',e=>{if(typing(e.target)||document.querySelector('dialog[open]'))return;if(e.key==='Control'||e.key==='Meta'){control=true;cursor();}if(e.code==='Space'&&(inside||stage.contains(document.activeElement))&&(inside||!e.target.closest?.('button'))){space=true;e.preventDefault();e.stopImmediatePropagation();cursor();}},true);
window.addEventListener('keyup',e=>{if(e.code==='Space')space=false;if(e.key==='Control'||e.key==='Meta')control=false;cursor();},true);
window.addEventListener('blur',()=>{space=false;control=false;end();});document.addEventListener('visibilitychange',()=>{if(document.hidden){space=false;control=false;end();}});
window.addEventListener('wheel',e=>{if(!stage.contains(e.target)||typing(e.target)||document.querySelector('dialog[open]')||!(e.ctrlKey||e.metaKey||space))return;e.preventDefault();e.stopImmediatePropagation();if(!img)return;const rect=$('photo').getBoundingClientRect();if(!rect.width||!rect.height)return;const nx=(e.clientX-rect.left)/rect.width,ny=(e.clientY-rect.top)/rect.height,g=Imaging.geometry(img.naturalWidth,img.naturalHeight,documentSettings),full=FX.borderGeometry(g.width,g.height,documentSettings),currentZoom=zoom||rect.width/full.width,delta=Math.max(-160,Math.min(160,e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?stage.clientHeight:1)));if(!delta)return;zoom=Math.max(.05,Math.min(4,currentZoom*Math.exp(-delta*.002)));layout();const after=$('photo').getBoundingClientRect();stage.scrollLeft+=after.left+nx*after.width-e.clientX;stage.scrollTop+=after.top+ny*after.height-e.clientY;window.detailPreviewUI?.invalidate();refine();},{capture:true,passive:false});
window.addEventListener('pointerdown',e=>{if(e.button!==0||!img||!stage.contains(e.target)||typing(e.target)||document.querySelector('dialog[open]')||!(e.ctrlKey||e.metaKey||space))return;e.preventDefault();e.stopImmediatePropagation();drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:stage.scrollLeft,top:stage.scrollTop};stage.setPointerCapture(e.pointerId);cursor();},true);
window.addEventListener('pointermove',e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();e.stopImmediatePropagation();stage.scrollLeft=drag.left+drag.x-e.clientX;stage.scrollTop=drag.top+drag.y-e.clientY;},true);
for(const type of ['pointerup','pointercancel'])window.addEventListener(type,e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();e.stopImmediatePropagation();end();window.detailPreviewUI?.refresh();},true);
stage.addEventListener('lostpointercapture',end);
$('photoFrame').title='Ctrl or Space + scroll to zoom here · Hold Ctrl or Space and drag to pan · Double-click for 100% / Fit';
})();
