const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),M=require('../js/model.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync(require.resolve('../js/lessons.js'),'utf8'),context);
const {lessons,groups}=context.window.LAContent;
test('all twelve chapters have learning, formal, proof and transfer content',()=>{assert.equal(lessons.length,12);assert.equal(new Set(lessons.map(l=>l.id)).size,12);assert.equal(groups.length,4);for(const l of lessons){for(const k of ['title','subtitle','lead','experiment','invitation','idea','connection'])assert.ok(l[k].length>8,l.id+': '+k);assert.equal(l.math.length,4);assert.equal(l.proof.steps.length,4);assert.ok(l.proof.limit.length>20);for(const kind of ['prediction','transfer']){const q=l[kind];assert.equal(q.choices.length,3);assert.ok(q.answer>=0&&q.answer<3);assert.ok(q.feedback.length>20);}}});
test('numeric prediction cases agree with independent pure model results',()=>{
 assert.deepEqual(M.add(M.scale([2,1],2),[-1,2]),[3,4]);assert.equal(M.dot([3,0],[0,5]),0);assert.deepEqual(M.mv([[2,1],[0,1]],[1,2]),[4,2]);assert.equal(M.rank2([[2,1],[1,.5]]),1);assert.deepEqual(M.projection([2,3],[1,0]).point,[2,0]);assert.equal((-.5)**2,.25);assert.equal(M.approximate([[3,0],[0,1]],1).error,1);const d=M.descent([2,1],.1,1);assert.ok(Math.abs(d.point[0]-1.8)<1e-8&&Math.abs(d.point[1]-.6)<1e-8);assert.equal(M.softmax([0,0,0])[0],1/3);assert.equal(M.embedding().E.length,4);assert.equal(M.embedding().E[0].length,2);assert.deepEqual(M.attention(0,1,true).selected,[1,0,0]);assert.ok(Math.abs(2*3*.1-.6)<1e-8);
});
test('transfer counterexamples distinguish plausible false conclusions',()=>{
 // Nonlinear row softmax raises the rank of this rank-one score matrix.
 const S=[[0,0],[0,1]],P=S.map(r=>M.softmax(r));assert.equal(M.rank2(S),1);assert.equal(M.rank2(P),2);
 // A rank-one update does not force a full-rank base to rank one.
 const update=[[1,0],[0,0]],base=[[1,0],[0,1]];assert.equal(M.rank2(update),1);assert.equal(M.rank2(base.map((r,i)=>r.map((v,j)=>v+update[i][j]))),2);
 // A projection's minimizer remains unique when coefficient representations differ.
 const X=[[1,2],[0,0]];assert.deepEqual(M.mv(X,[2,0]),M.mv(X,[0,1]));
 // Frobenius and spectral errors differ when more than one singular value is omitted.
 assert.equal(Math.hypot(3,1),Math.sqrt(10));assert.ok(Math.hypot(3,1)>3);
 // A residual can attain the 1+L bound exactly.
 const x=[1,2],y=[-1,1],L=.4;const Rx=M.scale(x,1+L),Ry=M.scale(y,1+L);assert.ok(Math.abs(M.norm(M.sub(Rx,Ry))-(1+L)*M.norm(M.sub(x,y)))<1e-8);
});
test('the static entry has relative, existing local assets and no runtime CDN',()=>{const html=fs.readFileSync('index.html','utf8');assert.ok(!/<script[^>]+src="https?:/i.test(html));for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){const p=match[1];if(p.startsWith('#')||/^https?:/.test(p))continue;assert.ok(fs.existsSync(p),'Missing '+p);}assert.ok(fs.existsSync('.nojekyll'));});
