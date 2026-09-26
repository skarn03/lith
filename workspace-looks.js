(()=>{
const browser=document.querySelector('.looks-browser'),bar=document.createElement('div');bar.className='looks-icon-bar';browser.prepend(bar);
const paths={search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',filter:'<path d="M3 5h18M6 12h12M9 19h6"/>',save:'<path d="M12 3v18M3 12h18"/>',share:'<path d="M12 16V3m-5 5 5-5 5 5M4 14v7h16v-7"/>',browse:'<path d="m8 7 4-4 4 4M12 3v18m-4-4 4 4 4-4"/>'};
function icon(button,type,label){button.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">'+paths[type]+'</svg>';button.title=label;button.setAttribute('aria-label',label);bar.append(button);}
for(const [id,type,label]of [['lookSearch','search','Search looks'],['presetFamily','filter','Filter look family']]){const control=document.getElementById(id),b=document.createElement('button');icon(b,type,label);control.hidden=true;b.setAttribute('aria-expanded','false');b.onclick=()=>{control.hidden=!control.hidden;b.setAttribute('aria-expanded',String(!control.hidden));if(!control.hidden)control.focus();};control.addEventListener('input',()=>b.classList.toggle('active',!!control.value&&control.value!=='all'));}
icon(document.getElementById('saveCustomLook'),'save','Save custom look');icon(document.getElementById('browseLooks'),'browse','Browse looks with arrow keys');
const share=document.querySelector('.look-share-actions'),b=document.createElement('button');icon(b,'share','Import or share looks');share.hidden=true;b.setAttribute('aria-expanded','false');b.onclick=()=>{share.hidden=!share.hidden;b.setAttribute('aria-expanded',String(!share.hidden));};
const hint=browser.querySelector('.look-instruction');if(hint)hint.hidden=true;
})();
