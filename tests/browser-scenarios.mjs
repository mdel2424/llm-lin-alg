export async function exercise({page,check,shot,profile}) {
 const visited=[];
 const ids=['vectors','dot-products','linear-maps','rank','projections','eigenvectors','svd','gradients','softmax','embeddings','attention','proofs'];
 const titles=['Vectors & combinations','Dot products & norms','Matrices & linear maps','Bases, rank & null spaces','Projections & least squares','Eigenvectors & stability','SVD & low-rank structure','Gradients & backpropagation','Probability & softmax','Embeddings & the residual stream','Self-attention, assembled','From equations to proofs'];
 const answers=[0,1,1,1,0,1,1,0,1,1,1,1],transfers=[0,0,1,1,1,1,0,1,1,1,1,1];
 const clickChapter=async id=>{if(profile.width<=720)await page.locator('#menu-button').click();await page.locator(`.chapter-link[data-lesson="${id}"]`).click();await page.waitForFunction(id=>location.hash==='#'+id,id);};
 const noOverflow=async()=>check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'No page-level horizontal overflow');
 check(await page.locator('h1').textContent().then(x=>x.includes('linear algebra')),'Overview names the subject');
 await noOverflow();
 const old=await page.locator('#hero-equation').textContent();await page.locator('#hero-reverse').click();check(await page.locator('#hero-equation').textContent()!==old,'Hero vector control recomputes result');await page.locator('#hero-reset').click();
 await shot('overview');visited.push('overview');
 await page.locator('.header-right .reference-open').click();await page.locator('#reference-search').fill('Jacobian');check(await page.locator('.reference-row').count()===1,'Reference search filters notation');await page.keyboard.press('Escape');check(!await page.locator('#reference-dialog').isVisible(),'Reference closes with Escape');
 for(let i=0;i<ids.length;i++){
  await clickChapter(ids[i]);check(await page.locator('h1').textContent()===titles[i],`${ids[i]} chapter navigation`);check(await page.locator('#lab-equation').textContent().then(x=>x.length>10),`${ids[i]} computed equation rendered`);
  const range=page.locator('#lab-controls input[type=range]').first();if(await range.count()) {const before=await page.locator('#lab-equation').textContent();await range.focus();await range.press('ArrowRight');const after=await page.locator('#lab-equation').textContent();if(ids[i]!=='svd')check(before!==after,`${ids[i]} range changes output`);}
  const question=page.locator('[data-question=prediction]');check(!await question.locator('.feedback').isVisible(),`${ids[i]} prediction hidden before commitment`);await question.locator(`[data-answer="${answers[i]}"]`).click();check(await question.locator('.feedback').isVisible(),`${ids[i]} prediction feedback revealed`);
  if(ids[i]==='vectors'){
   await page.locator('#input-bx').fill('1');check(await page.locator('#lab-readouts').textContent().then(t=>t.includes('(1, 2)')),'Vector coordinate editor updates readouts');const tip=page.locator('#plot-svg [data-drag]');await tip.focus();await tip.press('ArrowUp');check(await page.locator('#input-by').inputValue()==='2.1','Vector endpoint keyboard control');
   if(profile.full){const bounds=await tip.boundingBox();await page.mouse.move(bounds.x+bounds.width/2,bounds.y+bounds.height/2);await page.mouse.down();await page.mouse.move(bounds.x+40,bounds.y-15,{steps:4});await page.mouse.up();check(await page.locator('#input-bx').inputValue()!=='1','Vector pointer drag updates input');}
   await page.locator('[data-preset=cancel]').click();check((await page.locator('#lab-readouts .readout-value').last().textContent())==='(0, 0)','Negative combination cancels');
   await shot('first-experiment');
  }
  if(ids[i]==='dot-products'){await page.locator('[data-preset=zero]').click();check(await page.locator('#lab-readouts').textContent().then(t=>t.includes('undefined')),'Zero-vector cosine is disclosed');}
  if(ids[i]==='linear-maps'){await page.locator('[data-preset=rotate]').click();check(await page.locator('#lab-readouts .readout-value').first().textContent()==='1','Rotation preserves area');await page.locator('#input-a').fill('1');}
  if(ids[i]==='rank'){await page.locator('[data-preset=dependent]').click();check(await page.locator('#lab-readouts .readout-value').nth(1).textContent()==='1','Dependent columns have rank one');await shot('rank-collapse');}
  if(ids[i]==='projections'){await page.locator('[data-preset=through]').click();check(await page.locator('#lab-readouts .readout-value').nth(1).textContent()==='0','Projection through target has zero residual');}
  if(ids[i]==='eigenvectors'){await page.locator('[data-preset=growing]').click();check(await page.locator('#lab-readouts').textContent().then(t=>t.includes('yes')),'Eigendirection remains collinear');}
  if(ids[i]==='svd'){await page.locator('[data-preset=rank1]').click();check(await page.locator('#lab-readouts .readout-value').nth(1).textContent()==='1','Truncated SVD has rank one');check(Number((await page.locator('#lab-readouts .readout-value').nth(2).textContent()).replace('−','-'))>0,'SVD computes a nonzero approximation error');await shot('svd');}
  if(ids[i]==='gradients'){
   await page.locator('[data-preset=diverge]').click();await page.locator('#input-steps').focus();await page.locator('#input-steps').press('End');check(await page.locator('#experiment-note').textContent().then(t=>t.includes('left the fixed')),'Divergence leaves plot honestly');const loss=Number(await page.locator('#lab-readouts .readout-value').nth(1).textContent());check(loss>1000,'Overshoot increases computed loss');await shot('counterexample');await page.locator('#input-steps').press('Home');check(await page.locator('#lab-readouts .readout-value').nth(1).textContent()==='4','Scrubbing replays initial state');await page.locator('[data-preset=step]').click();
  }
  if(ids[i]==='softmax'){
   const probs=await page.locator('.bar-val').allTextContents();await page.locator('#input-offset').focus();await page.locator('#input-offset').press('End');check(JSON.stringify(probs)===JSON.stringify(await page.locator('.bar-val').allTextContents()),'Softmax invariant under +100 shift');await page.locator('[data-preset=equal]').click();check((await page.locator('.bar-val').allTextContents()).every(x=>x==='33.3%'),'Equal logits have uniform probabilities');await page.locator('[data-preset=scores]').click();
  }
  if(ids[i]==='embeddings'){await page.locator('[data-preset=token2]').click();check(await page.locator('#lab-readouts .readout-value').first().textContent()==='(−1, 2)','Embedding selection returns correct row');await page.locator('#input-hx').fill('-2');check(await page.locator('#lab-equation').textContent().then(t=>t.includes('−')),'Hidden-state coordinate changes logits');}
  if(ids[i]==='attention'){
   await page.locator('[data-query="0"]').click();check(await page.locator('#lab-readouts .readout-value').nth(1).textContent()==='1','First causal query sees one key');check(await page.locator('#lab-readouts .readout-value').nth(2).textContent()==='(1, 0.5)','First causal output equals first value');await page.locator('#input-causal').uncheck();check(await page.locator('#lab-readouts .readout-value').nth(1).textContent()==='3','Unmasking exposes all keys');await shot('attention');
  }
  await page.locator('[data-view=math]').click();check(await page.locator('.math-section').count()===4,`${ids[i]} formal bridge has definitions and assumptions`);if(i===10)await shot('formal-bridge');
  await page.locator('[data-view=proof]').click();for(let step=0;step<4;step++)await page.locator('#proof-next').click();check(await page.locator('.proof-step').count()===4,`${ids[i]} complete proof revealed`);
  const transfer=page.locator('[data-question=transfer]');check(!await transfer.locator('.feedback').isVisible(),`${ids[i]} transfer hidden before commitment`);await transfer.locator(`[data-answer="${transfers[i]}"]`).click();check(await transfer.locator('.feedback').isVisible(),`${ids[i]} transfer feedback visible`);
  if(i===11)await shot('transfer');
  await page.locator('#proof-reset').click();check(await page.locator('.proof-step').count()===0,`${ids[i]} proof reset`);
  await page.locator('[data-view=intuition]').click();await page.locator('#reset-lab').click();await page.locator('summary').click();check(await page.locator('details[open]').count()===1,`${ids[i]} fidelity note opens`);
  await noOverflow();visited.push(ids[i]+' / intuition, math, proof, transfer');
 }
 await page.locator('#complete-button').click();check(await page.locator('#progress-count').textContent()==='1 / 12','Chapter completion persists');await page.reload();check(await page.locator('#progress-count').textContent()==='1 / 12','Progress survives reload');
 await page.locator('.page-footer .about-open').click();await page.locator('#clear-progress').click();check(await page.locator('#progress-count').textContent()==='0 / 12','Reset progress works');await page.keyboard.press('Escape');
 if(profile.full){await clickChapter('vectors');await page.locator('.lesson-tab').first().focus();await page.keyboard.press('ArrowRight');check(await page.locator('[data-view=math]').getAttribute('aria-selected')==='true','Tabs support keyboard arrow navigation');}
 return visited;
}
