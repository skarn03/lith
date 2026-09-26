(function(scope){
'use strict';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,Number.isFinite(Number(v))?Number(v):0));
function normalize(v){if(!v||v.version!==2)return null;return {version:2,wb:['camera','auto','custom','spot'].includes(v.wb)?v.wb:'camera',temperature:clamp(v.temperature,-100,100),tint:clamp(v.tint,-100,100),exposure:clamp(v.exposure,-2,3),highlight:[0,2,5,9].includes(Number(v.highlight))?Number(v.highlight):2,spot:Array.isArray(v.spot)&&v.spot.length===2?v.spot.map(x=>clamp(x,0,1)):null};}
const defaults={version:2,wb:'camera',temperature:0,tint:0,exposure:0,highlight:2,spot:null};
const encode=x=>{const a=Math.abs(x);return Math.sign(x)*(a<=.0031308?12.92*a:1.055*a**(1/2.4)-.055);};
const decode=x=>{const a=Math.abs(x);return Math.sign(x)*(a<=.04045?a/12.92:((a+.055)/1.055)**2.4);};
// Linear Rec.2020 D65 -> linear sRGB D65. Negative/out-of-range values are retained.
function from2020(r,g,b){return [1.660491*r-.587641*g-.072850*b,-.124550*r+1.132900*g-.008349*b,-.018151*r-.100579*g+1.118730*b];}
function convert(data){for(let i=0;i<data.length;i+=4){const r=data[i]/255,g=data[i+1]/255,b=data[i+2]/255;data[i]=encode(1.660491*r-.587641*g-.072850*b)*255;data[i+1]=encode(-.124550*r+1.132900*g-.008349*b)*255;data[i+2]=encode(-.018151*r-.100579*g+1.118730*b)*255;}return data;}
function transfer(data,linear){for(let i=0;i<data.length;i+=4)for(let c=0;c<3;c++)data[i+c]=(linear?decode:encode)(data[i+c]/255)*255;return data;}
const api={normalize,defaults,encode,decode,from2020,convert,transfer,key:v=>JSON.stringify(normalize(v))};if(typeof module!=='undefined')module.exports=api;else scope.RawColor=api;
})(typeof self!=='undefined'?self:globalThis);
