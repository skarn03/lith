(function(scope){
function limit({width,height,viewportWidth,viewportHeight,dpr=1,zoom=0,best=true,interactive=false,budget=2048,tiled=false}){
 const edge=Math.max(width,height),fit=Math.min(Math.max(1,viewportWidth-52)/width,Math.max(1,viewportHeight-52)/height,1),density=Math.max(1,dpr);
 if(!interactive&&zoom>=1&&!tiled)return 0;
 const scale=zoom>=1&&tiled?fit:(zoom||fit),display=Math.ceil(edge*scale*density);
 if(interactive)return Math.min(edge,Math.max(Math.min(640,edge),Math.min(display,budget)));
 return Math.min(edge,Math.max(1280,Math.ceil(display*(best?1.5:1))));
}
const api={limit};if(typeof module!=='undefined')module.exports=api;else scope.PreviewPolicy=api;
})(globalThis);
