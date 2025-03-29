#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { parse } = require('yaml');

// Configuration
const JEKYLL_POSTS_DIR = path.join(__dirname, '../../jekyll-source/_posts');
const JEKYLL_ASSETS_DIR = path.join(__dirname, '../../jekyll-source/assets/images/posts');
const NEXTJS_POSTS_DIR = path.join(__dirname, '../content/posts');
const NEXTJS_IMAGES_DIR = path.join(__dirname, '../public/images/posts');

// Create directories if they don't exist
if (!fs.existsSync(NEXTJS_POSTS_DIR)) {
  fs.mkdirSync(NEXTJS_POSTS_DIR, { recursive: true });
}

if (!fs.existsSync(NEXTJS_IMAGES_DIR)) {
  fs.mkdirSync(NEXTJS_IMAGES_DIR, { recursive: true });
}

// Process each Jekyll post
function migrateJekyllPosts() {
  const postFiles = fs.readdirSync(JEKYLL_POSTS_DIR).filter(file => file.endsWith('.md'));
  
  console.log(`Found ${postFiles.length} posts to migrate`);
  
  postFiles.forEach(file => {
    const filePath = path.join(JEKYLL_POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract slug from filename (YYYY-MM-DD-slug.md)
    const fileNameMatch = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
    const slug = fileNameMatch ? fileNameMatch[1] : file.replace('.md', '');
    
    // Split frontmatter and content
    const parts = content.split('---');
    
    if (parts.length >= 3) {
      const frontmatterYaml = parts[1].trim();
      let markdown = parts.slice(2).join('---').trim();
      
      try {
        // Parse frontmatter
        const frontmatter = parse(frontmatterYaml);
        
        // Convert image paths
        markdown = updateImagePaths(markdown, slug);
        
        // Create new frontmatter
        const newFrontmatter = {
          title: frontmatter.title || 'Untitled',
          date: frontmatter.date,
          slug: slug,
          excerpt: frontmatter.excerpt || '',
          categories: frontmatter.categories || [],
          tags: frontmatter.tags || [],
          images: extractImages(frontmatter, slug),
          ratings: extractRatings(frontmatter)
        };
        
        // Create new markdown content
        const newContent = `---
${JSON.stringify(newFrontmatter, null, 2)}
---

${markdown}`;
        
        // Write to new location
        const newFilePath = path.join(NEXTJS_POSTS_DIR, `${slug}.mdx`);
        fs.writeFileSync(newFilePath, newContent);
        
        console.log(`✅ Migrated: ${file} -> ${slug}.mdx`);
        
        // Copy images
        copyImages(slug);
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
      }
    } else {
      console.error(`❌ Invalid format in ${file}`);
    }
  });
}

// Extract image information from frontmatter
function extractImages(frontmatter, slug) {
  const images = [];
  
  // Header image
  if (frontmatter.header && frontmatter.header.image) {
    const imagePath = frontmatter.header.image.replace(/^\/assets\/images\/posts\//, '');
    images.push({
      url: `/images/posts/${imagePath}`,
      alt: frontmatter.title,
      type: 'header'
    });
  }
  
  // Gallery images
  if (frontmatter.gallery && Array.isArray(frontmatter.gallery)) {
    frontmatter.gallery.forEach((item, index) => {
      if (item.image_path) {
        const imagePath = item.image_path.replace(/^assets\/images\/posts\//, '');
        images.push({
          url: `/images/posts/${imagePath}`,
          alt: item.alt || `Gallery image ${index + 1}`,
          type: 'gallery'
        });
      }
    });
  }
  
  return images;
}

// Extract ratings from sidebar
function extractRatings(frontmatter) {
  if (!frontmatter.sidebar || !frontmatter.sidebar[0] || !frontmatter.sidebar[0].text) {
    return {};
  }
  
  const sidebarText = frontmatter.sidebar[0].text;
  
  // Extract ratings using regex
  const ratings = {};
  const ratingMatches = sidebarText.matchAll(/<a>([^<]+)<\/a>\s*<a>([^<]+)\/10<\/a>/g);
  
  for (const match of ratingMatches) {
    if (match && match.length >= 3) {
      const key = match[1].trim().toLowerCase();
      const value = parseFloat(match[2].trim());
      ratings[key] = value;
    }
  }
  
  return ratings;
}

// Update image paths in markdown content
function updateImagePaths(content, slug) {
  // Update include gallery tag
  content = content.replace(
    /{% include gallery caption="([^"]*)" %}/g,
    '## Gallery\n\n$1'
  );
  
  // Update image paths
  content = content.replace(
    /!\[(.*?)\]\(\/assets\/images\/posts\/(.*?)\)/g,
    '![[$1]](/images/posts/$2)'
  );
  
  return content;
}

// Copy images from Jekyll to Next.js public folder
function copyImages(slug) {
  try {
    // Get list of images in the Jekyll assets directory
    const assetFiles = fs.readdirSync(JEKYLL_ASSETS_DIR);
    
    // Filter images that match the post slug
    const relevantImages = assetFiles.filter(file => file.includes(slug) && 
      (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.webp')));
    
    // Copy each image to the new location
    relevantImages.forEach(file => {
      const sourcePath = path.join(JEKYLL_ASSETS_DIR, file);
      const destPath = path.join(NEXTJS_IMAGES_DIR, file);
      
      fs.copyFileSync(sourcePath, destPath);
      console.log(`  📷 Copied image: ${file}`);
    });
    
    console.log(`  📁 Copied ${relevantImages.length} images for ${slug}`);
  } catch (error) {
    console.error(`❌ Error copying images for ${slug}:`, error);
  }
}

// Execute migration
migrateJekyllPosts();
console.log('Migration completed!'); 