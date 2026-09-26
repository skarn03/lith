// Native CI smoke test. Uses a temporary library, never the developer's photos.
const {_electron}=require('playwright'),fs=require('node:fs/promises'),path=require('node:path'),os=require('node:os'),assert=require('node:assert/strict');
(async()=>{
 const data=await fs.mkdtemp(path.join(os.tmpdir(),'lith-packaged-'));
 const executable=process.argv[2]||path.resolve('dist',process.arch==='arm64'?'mac-arm64':'mac','Lith.app/Contents/MacOS/Lith');
 let app;
 try{
  app=await _electron.launch({executablePath:executable,args:[],env:{...process.env,LUMA_DATA_DIR:data},timeout:60000});
  const page=await app.firstWindow(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.waitForFunction(()=>window.precisionUI&&catalog.projects?.length);
  assert.equal(await app.evaluate(({app})=>app.getVersion()),require('./package.json').version);
  await app.evaluate(({dialog},file)=>dialog.showOpenDialog=async()=>({canceled:false,filePaths:[file]}),path.resolve('docs/images/sample-town.jpg'));
  await page.click('#import');await page.waitForFunction(()=>img&&document.getElementById('photo').dataset.settled==='true',null,{timeout:60000});
  await page.evaluate(()=>mutate(()=>settings.exposure=.25));
  await page.waitForFunction(()=>document.getElementById('photo').dataset.settled==='true',null,{timeout:60000});
  await page.evaluate(()=>flush());
  const saved=JSON.parse(await fs.readFile(path.join(data,'catalog.json'),'utf8'));
  assert.equal(saved.photos[0].settings.nodes[0].adjustments.exposure,.25);
  const rawFile=path.join(data,'fixture.dng');
  await fs.writeFile(rawFile,require('./raw-test-fixture.cjs')());
  await app.evaluate(({dialog},file)=>dialog.showOpenDialog=async()=>({canceled:false,filePaths:[file]}),rawFile);
  await page.click('#import');await page.waitForFunction(()=>current?.ext==='.dng'&&img&&document.getElementById('photo').dataset.settled==='true',null,{timeout:60000});
  await page.locator('#rawDevelopCard summary').click();await page.selectOption('#rawRendering','modern');await page.click('#rawDevelopApply');
  await page.waitForFunction(()=>documentSettings.rawDevelop?.version===2&&document.getElementById('photo').dataset.settled==='true',null,{timeout:60000});
  await page.evaluate(()=>flush());
  assert.deepEqual(errors,[]);
  console.log('Packaged native app passed: launch, version, photo import, float preview, adjustment, saved edit and packaged wide-gamut RAW development. Architecture: '+process.arch);
 }finally{if(app)await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
