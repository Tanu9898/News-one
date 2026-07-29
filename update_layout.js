const fs = require('fs');
const path = require('path');

// Blogs data
const blogs = [
    {
        link: 'blogs/blog-1.html',
        img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'The Future of AI: How Agentic Systems are Revolutionizing the Web',
        excerpt: 'In a groundbreaking shift, autonomous AI agents are now capable of building entire software systems from scratch, reducing development time by 90%.',
        author: 'Aman Mirza'
    },
    {
        link: 'blogs/blog-2.html',
        img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'The Remote Work Revolution: Are Offices Obsolete?',
        excerpt: 'The corporate world has experienced a rapid transformation, pushing offices into the background in favor of remote flexibility.',
        author: 'Aman Mirza'
    },
    {
        link: 'blogs/blog-3.html',
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Why Vanilla JavaScript is Making a Huge Comeback',
        excerpt: 'Frameworks come and go, but Vanilla JavaScript remains the solid foundation of the web, proving its timeless efficiency.',
        author: 'Aman Mirza'
    },
    {
        link: 'blogs/blog-4.html',
        img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Mastering Minimalism in Web Design',
        excerpt: 'A cluttered UI distracts users. Minimalism focuses on what truly matters, creating beautiful, functional, and fast interfaces.',
        author: 'Aman Mirza'
    },
    {
        link: 'blogs/blog-5.html',
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        title: 'Breakthroughs in Renewable Energy Tech',
        excerpt: 'Sustainable technologies are becoming more efficient and accessible than ever, paving the way for a greener future.',
        author: 'Aman Mirza'
    }
];

// Left column: 3 items (0, 1, 2)
// Right column: 2 items (3, 4)

let html = `            <div class="split-grid">
                <div class="split-left">`;

for(let i=0; i<3; i++) {
    html += `
                    <article class="card-horizontal">
                        <a href="${blogs[i].link}" class="img-wrap"><img src="${blogs[i].img}" alt="News"></a>
                        <div class="content">
                            <h4><a href="${blogs[i].link}">${blogs[i].title}</a></h4>
                            <p class="excerpt">${blogs[i].excerpt}</p>
                            <div class="author">
                                <img src="https://ui-avatars.com/api/?name=Aman+Mirza&background=0D8ABC&color=fff" alt="Aman Mirza">
                                <span>${blogs[i].author}</span>
                            </div>
                        </div>
                    </article>`;
}

html += `
                </div>
                <div class="split-right">`;

for(let i=3; i<5; i++) {
    html += `
                    <article class="card-vertical">
                        <a href="${blogs[i].link}" class="img-wrap"><img src="${blogs[i].img}" alt="News"></a>
                        <div class="content">
                            <h4><a href="${blogs[i].link}">${blogs[i].title}</a></h4>
                        </div>
                    </article>`;
}

html += `
                </div>
            </div>`;


// Update index.html
const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
indexContent = indexContent.replace(/<div class="news-grid">[\s\S]*?<\/section>/, html + '\n        </section>');
fs.writeFileSync(indexPath, indexContent);

// Update blog.html (fix links to remove blogs/ prefix since we are already in root, wait, blog.html is in root so prefix blogs/ is correct)
const blogPath = path.join(__dirname, 'blog.html');
let blogContent = fs.readFileSync(blogPath, 'utf8');
blogContent = blogContent.replace(/<div class="news-grid"[^>]*>[\s\S]*?<\/section>/, html + '\n        </section>');
fs.writeFileSync(blogPath, blogContent);

console.log("HTML Layouts updated.");
