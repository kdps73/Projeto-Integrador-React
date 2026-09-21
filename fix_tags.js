const fs = require('fs');
const path = 'c:/Users/kaua.psilva7.SENACEDU/Desktop/projeto-integrador/src/Quiz.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
content = content.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');

fs.writeFileSync(path, content);
console.log('Done');
