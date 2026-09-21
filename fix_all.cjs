const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/kaua.psilva7.SENACEDU/Desktop/projeto-integrador/src';
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jsx'));

const cssMapping = {
    'App.jsx': ["import './css/App.css';"],
    'Quiz.jsx': ["import './css/App.css';", "import './css/quiz.css';"],
    'Resenha.jsx': ["import './css/App.css';", "import './css/resenha.css';"],
    'Listas.jsx': ["import './css/App.css';", "import './css/listas.css';"],
    'Login.jsx': ["import './css/login.css';"],
    'Registro.jsx': ["import './css/registro.css';"]
};

for (const file of files) {
    const filePath = path.join(srcDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix unclosed img and input tags
    content = content.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
    content = content.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
    
    // Fix unclosed hr and br if any exist
    content = content.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');
    content = content.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');

    // 2. Fix class= to className= and for= to htmlFor=
    // Only replacing when it looks like an attribute assignment
    content = content.replace(/(\s)class(\s*=\s*['"])/g, '$1className$2');
    content = content.replace(/(\s)for(\s*=\s*['"])/g, '$1htmlFor$2');
    
    // Fix inline styles from style="width:100%; height:140%; object-fit:cover;" to object format
    // This might be tricky, so let's do a basic conversion for the ones that look exactly like the ones in the files.
    // e.g. style="width:100%; height:140%; object-fit:cover;" -> style={{ width: '100%', height: '140%', objectFit: 'cover' }}
    // The user's code only has these simple strings for style.
    content = content.replace(/style="([^"]+)"/g, (match, p1) => {
        let styleObj = '{' + p1.split(';').filter(s => s.trim()).map(s => {
            let [k, v] = s.split(':');
            k = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${k}: '${v.trim()}'`;
        }).join(', ') + '}';
        return `style={${styleObj}}`;
    });

    // 3. Add CSS imports if not present
    if (cssMapping[file]) {
        let importsToAdd = [];
        for (const imp of cssMapping[file]) {
            if (!content.includes(imp)) {
                importsToAdd.push(imp);
            }
        }
        if (importsToAdd.length > 0) {
            content = importsToAdd.join('\n') + '\n\n' + content;
        }
    }
    
    // Remove old html css link tags if they sneaked into JSX
    content = content.replace(/<link[^>]*rel=["']stylesheet["'][^>]*\/?>/gi, '');

    fs.writeFileSync(filePath, content);
    console.log(`Processed ${file}`);
}
