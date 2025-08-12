import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

function tree(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).sort((a,b)=>a.name.localeCompare(b.name));
  for (const e of entries) {
    const p = path.join(dir, e.name);
    console.log(prefix + (e.isDirectory() ? '📁 ' : '📄 ') + path.relative(root, p) || '.');
    if (e.isDirectory() && prefix.length < 600) tree(p, prefix + '  ');
  }
}

console.log('CWD:', process.cwd());
console.log('ROOT:', root);
console.log('exists scripts/generate-index.mjs?', fs.existsSync(path.join(root,'scripts','generate-index.mjs')));
console.log('exists lessons/?', fs.existsSync(path.join(root,'lessons')));
console.log('--- TREE ---');
tree(root);
console.log('--- END TREE ---');
