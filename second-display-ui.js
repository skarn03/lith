(()=>{
 let state={active:false,displays:[]},toolsOnly=true,lastKey=null,pending=null,timer;
 const controls=document.createElement('div');controls.id='secondDisplayControls';controls.hidden=true;
 const choose=document.createElement('select');choose.setAttribute('aria-label','Photo monitor');
 const button=document.createElement('button');button.textContent='Second monitor';button.title='Show a full-resolution photo preview on another connected monitor';
 const label=document.createElement('label'),check=document.createElement('input');check.type='checkbox';check.checked=true;label.append(check,' Tools only');label.hidden=true;
 controls.append(choose,button,label);document.querySelector('.edit-heading').after(controls);
 function layoutMode(){document.body.classList.toggle('second-tools-only',state.active&&toolsOnly&&mode==='edit');requestAnimationFrame(()=>{if(img)layout();});}
 function sync(next){const was=state.active;state=next;if(!was&&state.active&&['mask','frame','text'].includes(document.querySelector('.tool-tabs .active')?.dataset.tool)){toolsOnly=false;check.checked=false;}controls.hidden=!state.displays.length&&!state.active;const selected=choose.value;choose.replaceChildren(...state.displays.map(d=>new Option(d.label+' · '+d.width+'×'+d.height,String(d.id))));choose.value=String(state.target||(state.displays.some(d=>String(d.id)===selected)?selected:state.displays[0]?.id));choose.hidden=state.displays.length<2||state.active;button.textContent=state.active?'Close second monitor':'Second monitor';button.setAttribute('aria-pressed',String(state.active));label.hidden=!state.active;layoutMode();if(was!==state.active){lastKey=null;if(state.active){Renderer.clear();if(img)render();}else{clearTimeout(timer);pending=null;if(img)render();}}}
 button.onclick=async()=>{try{if(state.active)await api.closeSecondDisplay();else sync(await api.openSecondDisplay(Number(choose.value)));}catch(e){fail(e);}};
 check.onchange=()=>{toolsOnly=check.checked;layoutMode();lastKey=null;if(img)render();};
 const originalSetTool=window.advancedUI.setTool;window.advancedUI.setTool=tool=>{if(state.active&&toolsOnly&&['mask','frame','text'].includes(tool)){toolsOnly=false;check.checked=false;layoutMode();if(img)render();}originalSetTool(tool);};
 // Spatial tools need the interactive image canvas on the editing screen.
 document.querySelector('.tool-tabs').addEventListener('click',e=>{if(state.active&&toolsOnly&&['mask','frame','text'].includes(e.target.closest('[data-tool]')?.dataset.tool)){toolsOnly=false;check.checked=false;layoutMode();if(img)render();toast('Photo shown here for drawing and positioning. Second monitor stays open.');}});
 window.secondDisplayUI={update(photo,settings,original){if(!state.active)return false;const payload=photo&&current?{id:current.id,name:current.name,settings,original}:null,key=JSON.stringify(payload);if(key!==lastKey){lastKey=key;pending=payload;if(!timer)timer=setTimeout(()=>{timer=null;api.sendSecondDisplay(pending);},32);}return toolsOnly&&mode==='edit';},clear(){lastKey=null;clearTimeout(timer);timer=null;pending=null;if(state.active)api.sendSecondDisplay(null);},sync:layoutMode};
 api.onSecondDisplay(sync);api.secondDisplayStatus().then(sync).catch(fail);
})();
