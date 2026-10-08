// Debug script to show exactly what's in the environment variables
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local explicitly
const result = config({ path: resolve(process.cwd(), '.env.local') });

console.log('\n=== ENVIRONMENT VARIABLES DEBUG ===\n');

if (result.error) {
  console.error('❌ Error loading .env.local:', result.error);
} else {
  console.log('✅ .env.local loaded successfully\n');
}

console.log('FIREBASE_PROJECT_ID:');
console.log('  Value:', process.env.FIREBASE_PROJECT_ID || '(not set)');
console.log('  Length:', (process.env.FIREBASE_PROJECT_ID || '').length);

console.log('\nFIREBASE_CLIENT_EMAIL:');
console.log('  Value:', process.env.FIREBASE_CLIENT_EMAIL || '(not set)');
console.log('  Length:', (process.env.FIREBASE_CLIENT_EMAIL || '').length);
console.log('  Has @:', (process.env.FIREBASE_CLIENT_EMAIL || '').includes('@'));

console.log('\nFIREBASE_PRIVATE_KEY:');
const privateKey = process.env.FIREBASE_PRIVATE_KEY || '';
console.log('  Length:', privateKey.length);
console.log('  First 80 chars:', privateKey.substring(0, 80));
console.log('  Last 50 chars:', privateKey.substring(privateKey.length - 50));
console.log('  Has BEGIN:', privateKey.includes('BEGIN PRIVATE KEY'));
console.log('  Has END:', privateKey.includes('END PRIVATE KEY'));
console.log('  Has \\n (literal):', privateKey.includes('\\n'));
console.log('  First \\n position:', privateKey.indexOf('\\n'));

console.log('\n=================================\n');

// Show common issues
const issues = [];

if (!process.env.FIREBASE_PROJECT_ID) {
  issues.push('❌ FIREBASE_PROJECT_ID is not set');
}

if (!process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_CLIENT_EMAIL.includes('@')) {
  issues.push('❌ FIREBASE_CLIENT_EMAIL is not set or invalid');
}

if (!privateKey.includes('BEGIN PRIVATE KEY')) {
  issues.push('❌ FIREBASE_PRIVATE_KEY does not contain "BEGIN PRIVATE KEY"');
}

if (!privateKey.includes('\\n')) {
  issues.push('⚠️  FIREBASE_PRIVATE_KEY does not contain \\n characters (might have real newlines instead)');
}

if (privateKey.length < 100) {
  issues.push('❌ FIREBASE_PRIVATE_KEY is too short (should be ~1600 characters)');
}

if (issues.length > 0) {
  console.log('ISSUES FOUND:\n');
  issues.forEach(issue => console.log(issue));
  console.log('\n');
} else {
  console.log('✅ All checks passed! Configuration looks correct.\n');
}
