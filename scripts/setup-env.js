#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Define paths
const rootDir = path.join(__dirname, '..');
const exampleEnvPath = path.join(rootDir, '.env.local.example');
const targetEnvPath = path.join(rootDir, '.env.local');

// Check if .env.local already exists
if (fs.existsSync(targetEnvPath)) {
  console.log('\x1b[33m%s\x1b[0m', '⚠️  .env.local already exists. Not overwriting existing file.');
  console.log('If you want to reset to the example values, please delete the file first and run this script again.');
  process.exit(0);
}

// Check if example file exists
if (!fs.existsSync(exampleEnvPath)) {
  console.error('\x1b[31m%s\x1b[0m', '❌ .env.local.example file not found. Cannot create .env.local');
  process.exit(1);
}

// Copy the example file
try {
  fs.copyFileSync(exampleEnvPath, targetEnvPath);
  console.log('\x1b[32m%s\x1b[0m', '✅ Created .env.local from example file.');
  console.log('\x1b[36m%s\x1b[0m', 'Please edit .env.local and fill in your Supabase credentials before starting the application.');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', `❌ Error creating .env.local: ${error.message}`);
  process.exit(1);
} 