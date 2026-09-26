(()=>{
'use strict';
const root=document.querySelector('.workspace-redesign');
// Route wheel input to the nearest scrollable container, including over thumbnails
// and controls. Leave photo zoom and browser pinch gestures to their own handlers.
root.addEventListener('wheel',e=>{
 if(e.ctrlKey||e.metaKey||e.target.closest('#stage'))return;
 const panel=e.target.closest('.workspace-panel');if(!panel)return;
 const delta=(Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY)*(e.deltaMode===1?24:e.deltaMode===2?panel.clientHeight:1);
 if(!delta)return;
 const candidates=[];for(let el=e.target;el&&el!==root;el=el.parentElement)candidates.push(el);
 // Wheel over a panel header or its search/filter controls browses its content.
 for(const el of panel.querySelectorAll('#filmstrip,#presets,.workspace-panel-body'))if(!candidates.includes(el))candidates.push(el);
 for(const el of candidates){const css=getComputedStyle(el),vertical=/(auto|scroll)/.test(css.overflowY)&&el.scrollHeight>el.clientHeight+1,horizontal=/(auto|scroll)/.test(css.overflowX)&&el.scrollWidth>el.clientWidth+1;
  const axis=(e.shiftKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))&&horizontal?'Left':vertical?'Top':horizontal?'Left':null;
  if(!axis)continue;const before=el['scroll'+axis];el['scroll'+axis]+=delta;
  if(el['scroll'+axis]!==before){e.preventDefault();e.stopPropagation();return;}
 }
},{capture:true,passive:false});
})();
