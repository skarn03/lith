(()=>{
const dialog=document.createElement('dialog');dialog.id='closingDialog';dialog.setAttribute('aria-labelledby','closingTitle');dialog.innerHTML='<div class="closing-spinner" aria-hidden="true"></div><div role="status" aria-live="polite"><strong id="closingTitle">Saving and closing…</strong><p>Your edits and queue are being saved.</p></div>';document.body.append(dialog);let active=false;
dialog.addEventListener('cancel',e=>e.preventDefault());
for(const type of ['keydown','keyup','pointerdown','wheel'])window.addEventListener(type,e=>{if(!active)return;e.preventDefault();e.stopImmediatePropagation();},{capture:true,passive:false});
window.closingUI={show(restart=false){active=true;$('closingTitle').textContent=restart?'Saving and restarting…':'Saving and closing…';if(!dialog.open)dialog.showModal();},hide(){active=false;if(dialog.open)dialog.close();}};
})();
