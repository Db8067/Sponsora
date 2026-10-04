const fs = require('fs');
const filePath = 'internship-app/app/SIH-present-deck/page.tsx';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync(filePath, content);
console.log('Fixed SIH-present-deck/page.tsx');
