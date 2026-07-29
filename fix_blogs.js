const fs = require('fs');
const path = require('path');

const blogs = [
    { file: 'blog-2.html', category: 'Business', title: 'The Remote Work Revolution: Are Offices Obsolete?', img: 'photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Business', caption: 'Remote work is changing the corporate landscape.' },
    { file: 'blog-3.html', category: 'Coding', title: 'Why Vanilla JavaScript is Making a Huge Comeback', img: 'photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Coding', caption: 'Vanilla JS offers unmatched performance.' },
    { file: 'blog-4.html', category: 'Design', title: 'Mastering Minimalism in Web Design', img: 'photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Design', caption: 'Minimalism leads to better user experiences.' },
    { file: 'blog-5.html', category: 'Science', title: 'Breakthroughs in Renewable Energy Tech', img: 'photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', alt: 'Science', caption: 'Renewable energy is the future.' }
];

const templatePath = path.join(__dirname, 'blogs', 'single-post.html');
const template = fs.readFileSync(templatePath, 'utf8');

blogs.forEach(b => {
    let content = template;
    
    // Replace title tags
    content = content.replace(/<title>.*?<\/title>/, `<title>${b.title} | NewsDaily</title>`);
    
    // Replace category
    content = content.replace(/<span class="category-badge">Technology<\/span>/, `<span class="category-badge">${b.category}</span>`);
    
    // Replace h1 post-title
    content = content.replace(/<h1 class="post-title">.*?<\/h1>/, `<h1 class="post-title">${b.title}</h1>`);
    
    // Replace image src and alt
    content = content.replace(/<img src="https:\/\/images.unsplash.com\/photo-1504711434969-[^"]+" alt="[^"]+">/, `<img src="https://images.unsplash.com/${b.img}" alt="${b.alt}">`);
    
    // Replace figcaption
    content = content.replace(/<figcaption>.*?<\/figcaption>/, `<figcaption>${b.caption}</figcaption>`);
    
    fs.writeFileSync(path.join(__dirname, 'blogs', b.file), content);
    console.log('Fixed', b.file);
});
