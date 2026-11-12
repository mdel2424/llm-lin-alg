// Development only: tests the static site directly, with all network access blocked.
import { chromium } from 'playwright';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mkdir, writeFile } from 'node:fs/promises';
import { exercise } from './browser-scenarios.mjs';
const site=resolve(dirname(fileURLToPath(import.meta.url)),'..'),out=resolve(site,'docs/qa');
await mkdir(out,{recursive:true});
const profiles=[
 {name:'desktop',width:1440,height:900,reducedMotion:'no-preference',full:true},
 {name:'laptop',width:1024,height:768,reducedMotion:'reduce'},
 {name:'tablet',width:768,height:1024,reducedMotion:'reduce'},
 {name:'mobile',width:390,height:844,reducedMotion:'reduce',touch:true},
 {name:'narrow',width:320,height:740,reducedMotion:'reduce'},
 {name:'landscape',width:844,height:390,reducedMotion:'reduce'},
 {name:'zoom-reflow',width:640,height:900,reducedMotion:'reduce',dpr:2}
];
const report={started:new Date().toISOString(),offline:true,profiles:[],errors:[],screenshots:[],passed:false};
let browser;
try {
 browser=await chromium.launch({headless:true});
 for(const profile of profiles){
  const context=await browser.newContext({viewport:{width:profile.width,height:profile.height},deviceScaleFactor:profile.dpr||1,reducedMotion:profile.reducedMotion,hasTouch:!!profile.touch,offline:true,serviceWorkers:'block'});
  const page=await context.newPage();page.setDefaultTimeout(12000);
  const run={profile:profile.name,assertions:[],visited:[]};report.profiles.push(run);
  const fail=message=>report.errors.push(profile.name+': '+message);
  await context.route('**/*',async route=>{if(/^(file|data|blob):/.test(route.request().url()))await route.continue();else{fail('Network dependency: '+route.request().url());await route.abort();}});
  page.on('pageerror',e=>fail(e.message));page.on('console',m=>{if(m.type()==='error')fail(m.text());});page.on('requestfailed',r=>fail('Failed request: '+r.url()));
  const check=(condition,message)=>{if(!condition)throw new Error(message);run.assertions.push(message);};
  const shot=async name=>{const file=profile.name+'-'+name+'.png';await page.screenshot({path:resolve(out,file),fullPage:true});report.screenshots.push(file);};
  try{await page.goto(pathToFileURL(resolve(site,'index.html')).href);run.visited=await exercise({page,profile,check,shot});console.log(`PASS ${profile.name}: ${run.assertions.length} checks`);}
  catch(e){fail(e.stack||e.message);await shot('failure').catch(()=>{});console.error(`FAIL ${profile.name}: ${e.message}`);}
  finally{await context.close();}
 }
}catch(e){report.errors.push(e.message);console.error(e.message);}
finally{await browser?.close();report.finished=new Date().toISOString();report.passed=report.profiles.length===profiles.length&&report.errors.length===0;await writeFile(resolve(out,'report.json'),JSON.stringify(report,null,2));}
if(!report.passed)process.exitCode=1;else console.log('Open the screenshots to check visual clarity; assertions do not establish readability.');
