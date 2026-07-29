const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove <div class="meta">...</div> (non-greedy)
        content = content.replace(/<div class="meta">[\s\S]*?<\/div>/g, '');
        
        // Remove <span class="time">...</span>
        content = content.replace(/<span class="time"[^>]*>[\s\S]*?<\/span>/g, '');
        
        // Remove <span class="date">...</span>
        content = content.replace(/<span class="date"[^>]*>[\s\S]*?<\/span>/g, '');
        
        // Remove any dangling author info in index.html featured section (it might just be <span> or •)
        // Let's also replace "•" just in case it's floating around in the HTML (but careful not to remove bullet points)
        // Since meta is gone, we don't have to worry about the • inside it.

        fs.writeFileSync(filePath, content);
        console.log(`Updated times and names in ${file}`);
    });
}

const baseDir = __dirname;
const blogsDir = path.join(__dirname, 'blogs');

processFiles(baseDir);
processFiles(blogsDir);

console.log("Cleanup complete.");
