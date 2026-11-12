// Copy only deployable files and verify links inside the resulting artifact.
import { cp, mkdir, readFile, stat } from 'node:fs/promises';
import { dirname, resolve, extname, relative } from 'node:path';
const root=process.cwd(),out=resolve(root,process.argv[2]||'_site');
if(out===root||!relative(root,out)||relative(root,out).startsWith('..'))throw new Error('Output must be a subdirectory of this checkout.');
await mkdir(out,{recursive:true});
for(const file of ['index.html','style.css','.nojekyll','README.md','FIDELITY.md'])await cp(resolve(root,file),resolve(out,file));
for(const dir of ['js','assets'])await cp(resolve(root,dir),resolve(out,dir),{recursive:true});
await mkdir(resolve(out,'docs'),{recursive:true});await cp(resolve(root,'docs/VERIFICATION.md'),resolve(out,'docs/VERIFICATION.md'));
let checked=0;
for(const file of ['index.html','style.css','README.md','FIDELITY.md','docs/VERIFICATION.md']){
 const source=await readFile(resolve(out,file),'utf8');
 const targets=extname(file)==='.css'?[...source.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)]:extname(file)==='.html'?[...source.matchAll(/(?:src|href)="([^"]+)"/g)]:[...source.matchAll(/\[[^\]]*\]\(([^\s)]+)\)/g)];
 for(const [,target] of targets){if(/^(?:[a-z]+:|#|\/\/)/i.test(target))continue;const resolved=resolve(dirname(resolve(out,file)),target.split(/[?#]/)[0]);if(relative(out,resolved).startsWith('..'))throw new Error(`Artifact link escapes output: ${file} → ${target}`);await stat(resolved);checked++;}
}
console.log(`Packaged static site in ${relative(root,out)}; ${checked} artifact links/assets resolved.`);
