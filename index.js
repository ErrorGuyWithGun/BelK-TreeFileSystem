const fs = require('fs');
const path = require('path');

const BLUE = '\x1b[34m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const RED = '\x1b[31m';

function printTree(directory, level = 0, prefix = '') {
  const files = fs.readdirSync(directory);
  
  files.forEach((file, index) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    const isLast = index === files.length - 1;
    const displayPrefix = `${prefix}${isLast ? '└' : '├'}─ `;

    if (stats.isDirectory()) {
      console.log(`${RED}${displayPrefix}${RESET}${BLUE}${file}${RESET}`);
      printTree(filePath, level + 1, prefix + (isLast ? '    ' : '|   '));
    } else {
      console.log(`${RED}${displayPrefix}${RESET}${GREEN}${file}${RESET}`);
    }
  });   
}

printTree(process.argv[2] || './');
