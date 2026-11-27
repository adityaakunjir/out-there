/* Build with Node and a local installation of three@0.160.1. Pass the package root as argv[2]. */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const pkg=path.resolve(process.argv[2]);
const moduleAt=s=>import(pathToFileURL(path.join(pkg,s)));
const {FontLoader}=await moduleAt("examples/jsm/loaders/FontLoader.js");
const {TextGeometry}=await moduleAt("examples/jsm/geometries/TextGeometry.js");
const {TessellateModifier}=await moduleAt("examples/jsm/modifiers/TessellateModifier.js");
const font=new FontLoader().parse(JSON.parse(fs.readFileSync(path.join(pkg,"examples/fonts/helvetiker_bold.typeface.json"))));
const shape=new TextGeometry("OUT THERE",{font,size:1,height:.24,curveSegments:9,bevelEnabled:true,bevelSegments:2,bevelSize:.018,bevelThickness:.023,steps:1});
shape.center();
const mesh=new TessellateModifier(.20,9).modify(shape);
const positions=mesh.attributes.position.array;
const vertices=new Map(), indices=[];
for(let i=0;i<positions.length;i+=3) {
 const xyz=[...positions.slice(i,i+3)].map(n=>Math.round(n*4096));
 const key=xyz.join(",");
 if(!vertices.has(key)) vertices.set(key,{index:vertices.size,xyz});
 indices.push(vertices.get(key).index);
}
const header=new Uint32Array([vertices.size,indices.length]);
const coords=new Int16Array(Array.from(vertices.values()).flatMap(v=>v.xyz));
const faces=new Uint16Array(indices);
fs.writeFileSync(fileURLToPath(new URL("../../dist/assets/hero/signature.mesh",import.meta.url)),Buffer.concat([Buffer.from(header.buffer),Buffer.from(coords.buffer),Buffer.from(faces.buffer)]));
