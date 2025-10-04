#!/usr/bin/env node

/**
 * Image optimization script
 * Converts PNG images to WebP format for better performance
 */

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const sourceImage = fileURLToPath(new URL('../src/assets/images/nick-headshot.png', import.meta.url));
const targetImage = fileURLToPath(new URL('../src/assets/images/nick-headshot.webp', import.meta.url));

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited with code ${code}`));
      }
    });
  });
}

async function optimizeImage() {
  try {
    // Install sharp if not available
    console.log('Installing sharp...');
    await runCommand('pnpm', ['add', '-D', 'sharp']);
    
    // Use sharp to convert and optimize
    console.log('Converting PNG to WebP...');
    const sharp = (await import('sharp')).default;
    
    await sharp(sourceImage)
      .resize(800, 800, { // Resize to appropriate dimensions (larger than 384px for retina)
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 85, // Good balance between quality and size
        effort: 6    // More compression effort
      })
      .toFile(targetImage);
    
    console.log('✅ Image optimized successfully!');
    console.log(`   Source: ${sourceImage}`);
    console.log(`   Target: ${targetImage}`);
    
  } catch (error) {
    console.error('❌ Error optimizing image:', error);
    process.exit(1);
  }
}

optimizeImage();
