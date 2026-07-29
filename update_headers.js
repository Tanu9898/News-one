const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    const isRoot = path.dirname(filePath) === __dirname;
    const prefix = isRoot ? '' : '../';
    const content = fs.readFileSync(filePath, 'utf8');
    
    let homeActive = '';
    let blogActive = '';
    let contactActive = '';
    
    if (path.basename(filePath) === 'index.html') homeActive = ' class="active"';
    else if (path.basename(filePath) === 'blog.html' || !isRoot) blogActive = ' class="active"';
    else if (path.basename(filePath) === 'contact.html') contactActive = ' class="active"';

    const newHeader = `<div class="header-top">
            <div class="logo">
                <h1><a href="${prefix}index.html">NewsDaily<span class="dot">.</span></a></h1>
            </div>
            <nav class="main-nav" id="main-nav">
                <ul>
                    <li><a href="${prefix}index.html"${homeActive}>Home</a></li>
                    <li><a href="${prefix}blog.html"${blogActive}>Blog</a></li>
                    <li><a href="${prefix}contact.html"${contactActive}>Contact Us</a></li>
                </ul>
            </nav>
            <div class="menu-icon" id="mobile-menu-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>
            </div>
        </div>`;

    const regex = /<div class="header-top">[\s\S]*?<\/nav>/;
    const updatedContent = content.replace(regex, newHeader);
    
    fs.writeFileSync(filePath, updatedContent);
    console.log('Updated ' + filePath);
}

const files = [
    'index.html',
    'blog.html',
    'contact.html',
    'blogs/blog-1.html',
    'blogs/blog-2.html',
    'blogs/blog-3.html',
    'blogs/blog-4.html',
    'blogs/blog-5.html',
    'blogs/single-post.html'
];

files.forEach(f => {
    const fullPath = path.join(__dirname, f);
    if(fs.existsSync(fullPath)) {
        processFile(fullPath);
    }
});
