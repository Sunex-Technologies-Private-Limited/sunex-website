import fs from 'fs';
import path from 'path';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace grid + place-items: center with flex equivalents to fix Safari SVG centering
  content = content.replace(/display:\s*(inline-)?grid;([^}]*?)place-items:\s*center;/g, (match, p1, p2) => {
    // If it relies on actual grid features, skip it
    if (p2.includes('grid-template') || p2.includes('grid-column') || p2.includes('grid-row')) {
      return match;
    }
    return `display: ${p1 ? 'inline-flex' : 'flex'};${p2}align-items: center; justify-content: center;`;
  });
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else if (full.endsWith('.css')) {
      fixFile(full);
    }
  }
}

walk('c:/Users/omkar/Downloads/sunex-rivr/client/src');
