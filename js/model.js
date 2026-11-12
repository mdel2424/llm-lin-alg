/* Pure numerical mechanisms; usable in a browser or Node. */
(function (root) {
  'use strict';
  const EPS = 1e-9;
  const add = (a,b) => a.map((v,i)=>v+b[i]);
  const sub = (a,b) => a.map((v,i)=>v-b[i]);
  const scale = (a,s) => a.map(v=>v*s);
  const dot = (a,b) => a.reduce((s,v,i)=>s+v*b[i],0);
  const norm = a => Math.hypot(...a);
  const transpose = A => A[0].map((_,j)=>A.map(r=>r[j]));
  const mv = (A,x) => A.map(r=>dot(r,x));
  const mm = (A,B) => A.map(r=>transpose(B).map(c=>dot(r,c)));
  const det = A => A[0][0]*A[1][1]-A[0][1]*A[1][0];
  const rank2 = A => Math.abs(det(A))>EPS ? 2 : A.flat().some(x=>Math.abs(x)>EPS) ? 1 : 0;
  const rotation = t => [[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]];
  const direction = deg => [Math.cos(deg*Math.PI/180),Math.sin(deg*Math.PI/180)];
  function softmax(z,temperature=1) {
    if (!(temperature>0)) throw new RangeError('Temperature must be positive.');
    const max=Math.max(...z), e=z.map(x=>Math.exp((x-max)/temperature)), sum=e.reduce((a,b)=>a+b,0);
    return e.map(x=>x/sum);
  }
  function projection(x,u) {
    const denom=dot(u,u);
    if (denom<EPS) return {point:[0,0],residual:x.slice(),defined:false};
    const point=scale(u,dot(x,u)/denom);
    return {point,residual:sub(x,point),defined:true};
  }
  function svd2(A) {
    const C=mm(transpose(A),A), a=C[0][0], b=C[0][1], d=C[1][1];
    const theta=.5*Math.atan2(2*b,a-d), v1=[Math.cos(theta),Math.sin(theta)],v2=[-Math.sin(theta),Math.cos(theta)];
    const singular=[Math.sqrt(Math.max(0,(a+d+Math.hypot(a-d,2*b))/2)),Math.sqrt(Math.max(0,(a+d-Math.hypot(a-d,2*b))/2))];
    let u1=singular[0]>EPS ? scale(mv(A,v1),1/singular[0]) : [1,0];
    let u2=singular[1]>EPS ? scale(mv(A,v2),1/singular[1]) : [-u1[1],u1[0]];
    return {U:transpose([u1,u2]),V:transpose([v1,v2]),singular};
  }
  function approximate(A,rank) {
    const s=svd2(A), S=[[s.singular[0],0],[0,rank===2?s.singular[1]:0]];
    return {matrix:mm(mm(s.U,S),transpose(s.V)),...s,error:rank===2?0:s.singular[1]};
  }
  function descent(start,eta,steps) {
    const path=[start.slice()];
    for(let i=0;i<steps;i++) { const [x,y]=path.at(-1); path.push([x-eta*x,y-eta*4*y]); }
    const point=path.at(-1),loss=.5*(point[0]**2+4*point[1]**2);
    return {path,point,loss,gradient:[point[0],4*point[1]],stable:eta>0&&eta<.5};
  }
  const tokens=['the','river','bank'];
  const X=[[1,0],[0,1],[1,1]];
  function attention(queryIndex=2,temperature=1,causal=true,queryMix=.5) {
    const Wq=[[1,queryMix],[0,1]], Wk=[[1,0],[.5,1]], Wv=[[1,.5],[0,1]];
    const Q=mm(X,Wq),K=mm(X,Wk),V=mm(X,Wv);
    const scores=Q.map((q,i)=>K.map((k,j)=>causal&&j>i ? -Infinity : dot(q,k)/Math.sqrt(2)));
    const weights=scores.map(r=>softmax(r,temperature)), output=mm(weights,V);
    return {tokens,X,Q,K,V,Wq,Wk,Wv,scores,weights,output,queryIndex,selected:weights[queryIndex],value:output[queryIndex]};
  }
  function embedding(index=0,x=1,y=1) {
    const names=['river','bank','money','water'],E=[[2,.5],[1,1],[-1,2],[2,1.5]],h=[x,y];
    const logits=E.map(e=>dot(e,h));
    return {names,E,selected:E[index],h,logits,probabilities:softmax(logits)};
  }
  function normBound(angle,first=1.2,second=.7) {
    const A=mm(rotation(.5),[[first,0],[0,.3]]),B=mm([[second,0],[0,.4]],rotation(-.3)),x=scale(direction(angle),2);
    const Ax=mv(A,x),BAx=mv(B,Ax),actual=norm(BAx),bound=Math.max(first,.3)*Math.max(second,.4)*norm(x);
    return {A,B,x,Ax,BAx,actual,bound,ratio:actual/bound};
  }
  const M={EPS,add,sub,scale,dot,norm,transpose,mv,mm,det,rank2,rotation,direction,softmax,projection,svd2,approximate,descent,attention,embedding,normBound};
  root.LAMath=M;
  if(typeof module!=='undefined') module.exports=M;
})(typeof window!=='undefined'?window:globalThis);
