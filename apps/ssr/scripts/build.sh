#!/bin/bash
set -e
cd ../web
pnpm build

rm -rf ../ssr/public
cp -r dist ../ssr/public
cd ../ssr
# Convert HTML to JS format with exported string
node -e "
const fs = require('fs');
const html = fs.readFileSync('./public/index.html', 'utf8');
const jsContent = \`export default \\\`\${html.replace(/\`/g, '\\\\\`').replace(/\\\$/g, '\\\\\$')}\\\`;\`;
fs.writeFileSync('./src/index.html.ts', jsContent);
"
rm ./public/index.html
# pnpm build:jpg
pnpm build:next
