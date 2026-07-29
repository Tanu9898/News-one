const fs = require('fs');
const path = require('path');

// 1. Remove .post-meta from all blogs/blog-*.html
const blogsDir = path.join(__dirname, 'blogs');
const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.html'));

blogFiles.forEach(file => {
    const filePath = path.join(blogsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <div class="post-meta"> ... up to </header>
    content = content.replace(/<div class="post-meta">[\s\S]*?<\/div>\s*<\/header>/, '</header>');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

// 2. Remove .author from index.html and blog.html
const indexAndBlog = ['index.html', 'blog.html'];

indexAndBlog.forEach(file => {
    const filePath = path.join(__dirname, file);
    if(fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(/<div class="author">[\s\S]*?<\/div>/g, '');
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
});

// 3. Remove .author CSS from style.css
const stylePath = path.join(__dirname, 'style.css');
if(fs.existsSync(stylePath)) {
    let content = fs.readFileSync(stylePath, 'utf8');
    content = content.replace(/\.card-horizontal \.author \{[\s\S]*?\}\s*/g, '');
    content = content.replace(/\.card-horizontal \.author img \{[\s\S]*?\}\s*/g, '');
    fs.writeFileSync(stylePath, content);
    console.log(`Updated style.css`);
}

console.log("Cleanup complete.");
