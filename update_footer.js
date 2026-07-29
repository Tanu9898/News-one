const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const blogsDir = path.join(__dirname, 'blogs');

// Function to generate the footer HTML based on whether we are in the root or blogs directory
function getFooterHTML(isRoot) {
    const prefix = isRoot ? '' : '../';
    return `    <footer>
        <div class="footer-content container">
            <div class="footer-brand">
                <h2>NewsDaily<span class="dot">.</span></h2>
            </div>
            <div class="footer-links">
                <a href="${prefix}index.html">Home</a>
                <a href="${prefix}blog.html">Blog</a>
                <a href="${prefix}contact.html">Contact Us</a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 NewsDaily. All rights reserved.</p>
        </div>
    </footer>`;
}

function processFiles(dir, isRoot) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Regex to match <footer> ... </footer>
        const regex = /<footer>[\s\S]*?<\/footer>/i;
        
        if (regex.test(content)) {
            content = content.replace(regex, getFooterHTML(isRoot));
            fs.writeFileSync(filePath, content);
            console.log(`Updated footer in ${file}`);
        } else {
            console.log(`No footer found in ${file}`);
        }
    });
}

// Process root files
processFiles(baseDir, true);

// Process blog files
processFiles(blogsDir, false);

console.log("Footer replacement complete.");
