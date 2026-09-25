(function(scope){
const excluded=new Set(['nodes','_schema','developMix','masks','textLayers',...Imaging.compositionKeys]);
const allowed=key=>Object.hasOwn(Imaging.defaults,key)&&!excluded.has(key);
function capture(node,keys){return Object.fromEntries([...new Set(keys)].filter(allowed).map(key=>[key,structuredClone(node.adjustments?.[key]??Imaging.defaults[key])]));}
function apply(doc,sourceId,targetId,values,move=false){const source=doc.nodes.find(n=>n.uid===sourceId),target=doc.nodes.find(n=>n.uid===targetId);if(!target)throw Error('Choose a destination node.');if(move&&(!source||source===target))throw Error('Choose a different destination node.');if(target.legacyStage||(target.operations||[{type:target.operation||'develop'}]).some(o=>o.type!=='develop'))throw Error('Choose a full Develop node or create a new node.');target.adjustments||={};for(const [key,value]of Object.entries(values)){if(!allowed(key))continue;target.adjustments[key]=structuredClone(value);if(move)source.adjustments[key]=structuredClone(Imaging.defaults[key]);}}
const api={capture,apply,allowed};if(typeof module!=='undefined')module.exports=api;else scope.SectionEdits=api;
})(globalThis);
