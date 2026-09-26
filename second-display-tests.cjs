const assert=require('node:assert/strict'),{EventEmitter}=require('node:events'),fs=require('node:fs'),vm=require('node:vm');
(async()=>{
 const handlers={},events={},sent=[];let monitors=[{id:1,bounds:{x:0,y:0,width:1200,height:800},size:{width:1200,height:800}}],destroyed=false;
 const screen=new EventEmitter();screen.getAllDisplays=()=>monitors;screen.getDisplayMatching=()=>monitors[0];
 const editor=new EventEmitter();editor.webContents={send:(...args)=>sent.push(args)};editor.getBounds=()=>monitors[0].bounds;editor.isDestroyed=()=>destroyed;editor.focus=()=>{};
 const created=[];class BrowserWindow extends EventEmitter{constructor(options){super();this.options=options;this.dead=false;this.webContents=new EventEmitter();this.webContents.send=(...a)=>this.frame=a;this.webContents.setWindowOpenHandler=()=>{};created.push(this);}async loadFile(){}setBounds(){}show(){}setFullScreen(){}isDestroyed(){return this.dead;}close(){this.dead=true;this.emit('closed');}}
 const context={require:n=>n==='electron'?{BrowserWindow,screen,ipcMain:{handle:(k,f)=>handlers[k]=f,on:(k,f)=>events[k]=f}}:require(n),module:{exports:{}},__dirname};
 vm.runInNewContext(fs.readFileSync(require.resolve('./second-display.cjs'),'utf8'),context);context.module.exports.setupSecondDisplay(editor);
 const event={sender:editor.webContents};assert.equal(handlers['second-display-status'](event).displays.length,0);
 await assert.rejects(()=>handlers['second-display-open'](event,1),/another monitor/);
 await assert.rejects(()=>handlers['second-display-open']({sender:{}},2),/Invalid window/);
 monitors.push({...monitors[0],id:2,label:'Photo screen',bounds:{x:1200,y:0,width:1200,height:800}});screen.emit('display-added');assert.equal(sent.at(-1)[1].displays.length,1);
 await handlers['second-display-open'](event,2);assert.equal(handlers['second-display-status'](event).active,true);assert.equal(created[0].options.webPreferences.nodeIntegration,false);
 events['second-display-frame']({sender:{}},{id:'wrong'});assert.equal(created[0].frame,undefined);
 events['second-display-frame'](event,{id:'photo'});assert.equal(created[0].frame[1].id,'photo');
 monitors=monitors.slice(0,1);screen.emit('display-removed');assert.equal(created[0].dead,true);assert.equal(handlers['second-display-status'](event).active,false);
 destroyed=true;editor.emit('closed');assert.equal(screen.listenerCount('display-added'),0);
 console.log('Passed: second-monitor availability, window authorization, isolated viewer, frame routing, unplug recovery and listener cleanup.');
})().catch(e=>{console.error(e);process.exitCode=1;});
