const {_electron}=require('playwright'),fs=require('fs/promises'),os=require('os'),path=require('path'),assert=require('assert/strict');
(async()=>{let app;try{
const dir=await fs.mkdtemp(path.join(os.tmpdir(),'lith-mask-ui-'));
app=await _electron.launch({args:[__dirname],env:{...process.env,LUMA_DATA_DIR:dir}});
const p=await app.firstWindow();const errors=[];p.on('pageerror',e=>errors.push(e.message));
await p.waitForFunction(()=>typeof catalog!=='undefined'&&catalog.projects?.length&&window.maskDesignUI);
await app.evaluate(({dialog},file)=>dialog.showOpenDialog=async()=>({filePaths:[file]}),path.join(__dirname,'docs/images/sample-town.jpg'));
await p.click('#import');await p.waitForFunction(()=>img&&$('photo').dataset.settled==='true');
await p.evaluate(()=>advancedUI.setTool('mask'));await p.click('#addBrush');
const node=await p.evaluate(()=>nodeUI.targetId());const mask=await p.locator('#maskList').inputValue();
await p.evaluate(()=>{advancedUI.setTool('light');advancedUI.setTool('mask');});
assert.equal(await p.evaluate(()=>maskUI.isEditing()),true);assert.equal(await p.locator('#maskList').inputValue(),mask);
await p.evaluate(()=>$('nodeAdd').click());await p.evaluate(()=>advancedUI.setTool('mask'));await p.click('#addRadial');
await p.evaluate(uid=>{nodeUI.choose(uid);advancedUI.setTool('mask');},node);
assert.equal(await p.locator('#maskList').inputValue(),mask);assert.equal(await p.evaluate(()=>maskUI.isEditing()),true);
await p.click('#maskCombineDetails>summary');await p.click('[data-component-type=brush]');const part=await p.locator('#maskComponent').inputValue();
await p.evaluate(()=>{advancedUI.setTool('color');advancedUI.setTool('mask');});assert.equal(await p.locator('#maskComponent').inputValue(),part);assert.equal(await p.evaluate(()=>maskUI.isEditing()),true);
await p.click('#maskPreviewDraw');assert.equal(await p.evaluate(()=>maskUI.isEditing()),false);await p.evaluate(()=>{advancedUI.setTool('light');advancedUI.setTool('mask');});assert.equal(await p.evaluate(()=>maskUI.isEditing()),false);await p.click('#maskPreviewDraw');
await p.click('#maskPreviewToggle');assert.equal(await p.locator('#maskOverlay').isChecked(),false);await p.click('#maskPreviewToggle');
const bounds=await p.locator('#photo').boundingBox(),x=bounds.x+bounds.width/2,y=bounds.y+bounds.height/2;
await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x+35,y+20,{steps:5});await p.mouse.up();
const strokes=()=>p.evaluate(()=>settings.masks[0].components[0].strokes.length);assert.equal(await strokes(),1);
await p.keyboard.down('Control');await p.mouse.move(x,y);await p.mouse.down();await p.mouse.move(x-25,y-15,{steps:3});await p.mouse.up();await p.keyboard.up('Control');assert.equal(await strokes(),1,'Ctrl pan must not paint');
await p.waitForFunction(()=>{const c=$('maskCanvas'),data=c.getContext('2d').getImageData(0,0,c.width,c.height).data;return data.some((v,i)=>i%4===3&&v>0);});
const edits=await p.evaluate(()=>JSON.stringify(settings));await p.evaluate(()=>{$('maskPreviewOpacity').value=60;$('maskPreviewOpacity').dispatchEvent(new Event('input'));});assert.equal(await p.evaluate(()=>JSON.stringify(settings)),edits);
await p.evaluate(()=>{$('maskCombineDetails').open=false;});await p.screenshot({path:path.join(dir,'masks-dark.png')});await p.evaluate(()=>document.documentElement.dataset.theme='white');await p.waitForTimeout(500);await p.screenshot({path:path.join(dir,'masks-light.png')});
assert.deepEqual(errors,[]);console.log('PASS: mask drawing and submask retention across tools/nodes, explicit pause, overlay controls, preview-only opacity. Screenshots: '+dir);
}finally{await app?.close();}})().catch(e=>{console.error(e);process.exit(1)});

