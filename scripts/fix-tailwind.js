const fs = require('fs');
const path = require('path');

// Directories to search
const searchDirs = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/app'),
];

// File extensions to search
const extensions = ['.tsx', '.jsx', '.ts', '.js', '.css'];

// Replacement mappings
const replacements = [
  { pattern: /border-border\/40/g, replace: 'border-gray-200' },
  { pattern: /border-border/g, replace: 'border-gray-200' },
  { pattern: /text-primary/g, replace: 'text-blue-600' },
  { pattern: /bg-primary/g, replace: 'bg-blue-600' },
  { pattern: /hover:bg-primary\/90/g, replace: 'hover:bg-blue-500' },
  { pattern: /text-muted-foreground/g, replace: 'text-gray-500' },
  { pattern: /bg-muted/g, replace: 'bg-gray-100' },
  { pattern: /hover:bg-muted/g, replace: 'hover:bg-gray-100' },
  { pattern: /border-primary\/30/g, replace: 'border-blue-300' },
];

// Count of replacements
let totalReplacements = 0;
let filesModified = 0;

// Function to recursively walk directories
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath); // Recursively search subdirectories
    } else if (extensions.includes(path.extname(file))) {
      replaceInFile(filePath);
    }
  });
}

// Function to replace in a file
function replaceInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let fileReplacements = 0;
    
    // Apply all replacements
    replacements.forEach(({ pattern, replace }) => {
      const matches = content.match(pattern) || [];
      content = content.replace(pattern, replace);
      fileReplacements += matches.length;
    });
    
    // Write changes if any replacements were made
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      totalReplacements += fileReplacements;
      filesModified++;
      
      console.log(`Modified ${filePath} (${fileReplacements} replacements)`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Run the script
console.log('Starting Tailwind class replacements...');
searchDirs.forEach(walkDir);
console.log(`\nCompleted: ${totalReplacements} replacements in ${filesModified} files.`); 