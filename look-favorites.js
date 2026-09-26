(()=>{
'use strict';
const storageKey='lith.favoriteLooks.v1';let saved=new Set(),onlyFavorites=false;
try{const value=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(value))saved=new Set(value.filter(v=>typeof v==='string'));}catch{}
const symbol='<svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path class="favorite-orbit" d="M23.5 10a10.5 10.5 0 1 0 .4 7"/><path class="favorite-star" d="m14 5 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L14 5Z"/><circle cx="24" cy="6" r="1.6" class="favorite-spark"/></svg>';
function key(id){const l=looks[id];return !l||!id?null:l[3]?.category==='custom'?'custom:'+(l[3].id||l[0]):l[3]?.category==='user-made'?'creator:'+l[3].author+':'+l[0]:'included:'+l[0];}
const isFavorite=id=>saved.has(key(id));
const filter=document.createElement('button');filter.id='favoriteLooksFilter';filter.type='button';filter.innerHTML=symbol+'<span>Favorites</span><b>0</b>';filter.setAttribute('aria-pressed','false');filter.title='Show favorite looks within the current category and search';document.querySelector('.looks-icon-bar').after(filter);
const empty=document.createElement('p');empty.id='favoriteLooksEmpty';empty.hidden=true;empty.setAttribute('role','status');$('presets').after(empty);
filter.onclick=()=>{onlyFavorites=!onlyFavorites;refresh();};
function refresh(){window.lookBrowserUI.filter();sync();}
function sync(){let total=0;for(const b of document.querySelectorAll('.preset')){const id=Number(b.dataset.lookId);if(!key(id))continue;let card=b.parentElement;if(!card.classList.contains('look-favorite-card')){card=document.createElement('div');card.className='look-favorite-card';b.before(card);card.append(b);const toggle=document.createElement('button');toggle.type='button';toggle.className='look-favorite';toggle.innerHTML=symbol;toggle.onclick=()=>{const next=new Set(saved);if(next.has(key(id)))next.delete(key(id));else next.add(key(id));try{localStorage.setItem(storageKey,JSON.stringify([...next]));}catch{toast('Could not save favorite looks on this device. Please try again.');return;}saved=next;const hadFocus=document.activeElement===toggle;refresh();if(hadFocus&&card.hidden)(document.querySelector('.look-favorite-card:not([hidden]) .look-favorite')||filter).focus();};card.append(toggle);}const favorite=isFavorite(id);if(favorite)total++;const toggle=card.querySelector('.look-favorite');toggle.setAttribute('aria-pressed',String(favorite));toggle.setAttribute('aria-label',(favorite?'Remove ':'Favorite ')+looks[id][0]+(favorite?' from favorites':''));toggle.title=(favorite?'Remove from favorites':'Add to favorites')+' · '+looks[id][0];card.hidden=b.hidden;}
filter.setAttribute('aria-pressed',String(onlyFavorites));filter.querySelector('b').textContent=total;empty.hidden=!onlyFavorites||!!document.querySelector('.preset:not([hidden])');empty.textContent=total?'No favorites match this category or search.':'No favorite looks yet. Click the halo star on a look to save it.';}
window.lookFavorites={sync,isFavorite,only:()=>onlyFavorites};
// New personal looks are appended after saving/importing; no image-render observer needed.
new MutationObserver(()=>sync()).observe($('presets'),{childList:true});
sync();
})();
