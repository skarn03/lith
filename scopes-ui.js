(()=>{
'use strict';
const box=document.querySelector('.histogram'),canvas=$('histogram'),ctx=canvas.getContext('2d'),sample=document.createElement('canvas');
sample.width=192;sample.height=128;const sampleContext=sample.getContext('2d',{willReadFrequently:true});
canvas.width=384;canvas.height=200;canvas.setAttribute('role','img');
const select=document.createElement('select');select.id='scopeMode';select.setAttribute('aria-label','Scope type');
for(const [value,label]of [['histogram','RGB histogram'],['luma','Luminance histogram'],['waveform','Luma waveform'],['parade','RGB parade']])select.append(new Option(label,value));
try{select.value=localStorage.getItem('lith.scopeMode')||'histogram';}catch{}if(!select.value)select.value='histogram';box.prepend(select);
const legend=canvas.nextElementSibling;let pixels=null;
function draw(){const mode=select.value,w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);ctx.fillStyle='#202329';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#ffffff18';ctx.lineWidth=1;for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(0,i*h/4);ctx.lineTo(w,i*h/4);ctx.stroke();}canvas.setAttribute('aria-label',select.selectedOptions[0].textContent+' of the displayed preview');legend.firstElementChild.textContent=mode==='waveform'||mode==='parade'?'TOP 100% · BOTTOM 0%':'SHADOWS';legend.lastElementChild.textContent=mode==='parade'?'R · G · B':mode==='waveform'?'LEFT → RIGHT':'HIGHLIGHTS';if(!pixels)return;
 const colors=['#ee8181','#87d9a3','#85b5f5'];
 if(mode==='histogram'||mode==='luma'){
  const bins=Array.from({length:mode==='luma'?1:3},()=>new Uint32Array(256));
  for(let i=0;i<pixels.length;i+=4){if(!pixels[i+3])continue;if(mode==='luma')bins[0][Math.round(.2126*pixels[i]+.7152*pixels[i+1]+.0722*pixels[i+2])]++;else for(let c=0;c<3;c++)bins[c][pixels[i+c]]++;}
  let max=1;for(const b of bins)for(const n of b)max=Math.max(max,n);ctx.globalAlpha=.6;
  bins.forEach((b,c)=>{ctx.fillStyle=mode==='luma'?'#d8dde4':colors[c];ctx.beginPath();ctx.moveTo(0,h);b.forEach((v,x)=>ctx.lineTo(x*w/255,h-Math.sqrt(v/max)*(h-8)));ctx.lineTo(w,h);ctx.closePath();ctx.fill();});ctx.globalAlpha=1;
 }else{
  ctx.globalAlpha=.12;const channels=mode==='parade'?3:1;
  for(let c=0;c<channels;c++){ctx.fillStyle=channels===3?colors[c]:'#cce9d8';for(let i=0;i<pixels.length;i+=4){if(!pixels[i+3])continue;const x=(i/4)%192,value=channels===3?pixels[i+c]:.2126*pixels[i]+.7152*pixels[i+1]+.0722*pixels[i+2];ctx.fillRect((c+x/192)*w/channels,(1-value/255)*(h-2),Math.max(1,w/192/channels),2);}}ctx.globalAlpha=1;
 }
}
function update(source){sampleContext.clearRect(0,0,192,128);sampleContext.drawImage(source,0,0,192,128);pixels=sampleContext.getImageData(0,0,192,128).data;draw();}
select.onchange=()=>{try{localStorage.setItem('lith.scopeMode',select.value);}catch{}draw();};
window.scopesUI={update};draw();
})();
