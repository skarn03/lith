const assert=require('node:assert/strict'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),{EventEmitter}=require('node:events');
(async()=>{
 const root=await fs.mkdtemp(path.join(os.tmpdir(),'lith-batch-test-')),folder=await fs.mkdtemp(path.join(os.tmpdir(),'lith-batch-output-'));
 const original={precision:'float32'},catalog={selected:'a',activeProjectId:'p',projects:[{id:'p',exportFolder:folder}],photos:[{id:'a',projectId:'p',name:'Photo.jpg',settings:structuredClone(original)},{id:'b',projectId:'p',name:'Photo.jpg',settings:structuredClone(original)}]},handlers={};let writes=0,fail=false;
 require('./batch-service.cjs').setup({ipcMain:{handle:(n,h)=>handlers[n]=h},getCatalog:()=>catalog,persist:async()=>{if(fail)throw Error('disk error');writes++;},root,chooseExportFolder:async()=>null});
 const changed={nodes:[{adjustments:{exposure:1}}]},updates=catalog.photos.map(p=>({id:p.id,expected:JSON.stringify(original),settings:changed}));
 await handlers['batch-save'](null,{projectId:'p',updates});assert.equal(writes,1);assert.equal(catalog.selected,'a');assert.equal(catalog.activeProjectId,'p');
 await assert.rejects(()=>handlers['batch-save'](null,{projectId:'p',updates}),/changed/);
 const undo=updates.map(u=>({id:u.id,expected:JSON.stringify(changed),settings:original}));fail=true;await assert.rejects(()=>handlers['batch-save'](null,{projectId:'p',updates:undo}),/disk error/);assert.deepEqual(catalog.photos[0].settings,changed);fail=false;
 await handlers['batch-save'](null,{projectId:'p',updates:undo});assert.deepEqual(catalog.photos[0].settings,original);
 const sender=new EventEmitter(),event={sender};const session=await handlers['batch-export-begin'](event,{projectId:'p',ids:['a','b'],format:'jpeg'});
 catalog.projects[0].exportFolder=root;const bytes=new Uint8Array([1,2,3]);const first=await handlers['batch-export-write'](null,{token:session.token,id:'a',bytes}),second=await handlers['batch-export-write'](null,{token:session.token,id:'b',bytes});assert.equal(await fs.realpath(path.dirname(first)),await fs.realpath(folder));assert.notEqual(first,second);assert.deepEqual(new Uint8Array(await fs.readFile(first)),bytes);
 await assert.rejects(()=>handlers['batch-export-write'](null,{token:session.token,id:'unknown',bytes}),/Invalid/);
 sender.emit('did-start-loading');await assert.rejects(()=>handlers['batch-export-write'](null,{token:session.token,id:'a',bytes}),/Invalid/);assert.equal(sender.listenerCount('render-process-gone'),0);
 await assert.rejects(()=>handlers['batch-export-begin'](event,{projectId:'p',ids:['a'],format:'jpeg'}),/outside/);
 console.log('Passed: batch all-or-none validation, saved selection preservation, conflict protection, rollback, undo, frozen export folder, no overwrite and reload cleanup.');
})().catch(e=>{console.error(e);process.exitCode=1;});
