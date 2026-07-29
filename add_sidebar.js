const fs = require('fs');
const path = require('path');

const blogsDir = path.join(__dirname, 'blogs');
const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.html'));

const sidebarHTML = `
            <aside class="sidebar article-sidebar">
                <div class="widget trending">
                    <h3>Related Articles</h3>
                    <ul class="trending-list">
                        <li>
                            <span class="number">1</span>
                            <div class="trend-content">
                                <h4><a href="blog-2.html">The Remote Work Revolution: Are Offices Obsolete?</a></h4>
                                <span class="time">2 hours ago</span>
                            </div>
                        </li>
                        <li>
                            <span class="number">2</span>
                            <div class="trend-content">
                                <h4><a href="blog-5.html">Breakthroughs in Renewable Energy Tech</a></h4>
                                <span class="time">4 hours ago</span>
                            </div>
                        </li>
                        <li>
                            <span class="number">3</span>
                            <div class="trend-content">
                                <h4><a href="blog-4.html">Mastering Minimalism in Web Design</a></h4>
                                <span class="time">5 hours ago</span>
                            </div>
                        </li>
                        <li>
                            <span class="number">4</span>
                            <div class="trend-content">
                                <h4><a href="blog-3.html">Why Vanilla JavaScript is Making a Huge Comeback</a></h4>
                                <span class="time">1 day ago</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
`;

blogFiles.forEach(file => {
    const filePath = path.join(blogsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('class="article-layout container"')) {
        console.log(`Already processed ${file}`);
        return;
    }

    content = content.replace(/<article class="single-post">/, '<div class="article-layout container">\n            <article class="single-post">');
    content = content.replace(/<\/article>\s*<\/main>/, '</article>\n' + sidebarHTML + '        </div>\n    </main>');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated HTML in ${file}`);
});

const stylePath = path.join(__dirname, 'style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');

if (!styleContent.includes('.article-layout {')) {
    const cssToAdd = `
.article-layout {
    display: grid;
    grid-template-columns: 2.5fr 1fr;
    gap: 40px;
    max-width: 1200px;
    margin: 60px auto 80px;
    align-items: start;
    padding: 0 20px;
}

.article-layout .single-post {
    margin: 0;
    max-width: 100%;
}

.article-sidebar {
    position: sticky;
    top: 30px;
}

@media (max-width: 992px) {
    .article-layout {
        grid-template-columns: 1fr;
        margin: 40px auto;
    }
}
`;
    styleContent += cssToAdd;
    fs.writeFileSync(stylePath, styleContent);
    console.log('Updated CSS in style.css');
}
