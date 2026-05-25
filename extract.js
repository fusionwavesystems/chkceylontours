const fs = require('fs');
let data = fs.readFileSync('public/srilanka-real2.svg', 'utf8');
const paths = [];
const regex = /d="([^"]+)"/g;
let match;
while ((match = regex.exec(data)) !== null) {
  paths.push(match[1]);
}
const componentCode = `import React from 'react';

export default function SriLankaPaths() {
    return (
        <g fill="rgba(255,240,31,0.05)" stroke="rgba(255,240,31,0.2)" strokeWidth="1.5">
            ${paths.map((p, i) => `<path key={${i}} d="${p}" />`).join('\n            ')}
        </g>
    );
}
`;
fs.writeFileSync('components/SriLankaPaths.jsx', componentCode);
console.log('Success');
