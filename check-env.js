// Simple script to check if .env.local is configured correctly
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('\n🔍 Checking Firebase Configuration...\n');

try {
  const envPath = join(__dirname, '.env.local');
  const envContent = readFileSync(envPath, 'utf8');
  
  const projectId = envContent.match(/FIREBASE_PROJECT_ID=(.+)/)?.[1]?.trim();
  const clientEmail = envContent.match(/FIREBASE_CLIENT_EMAIL=(.+)/)?.[1]?.trim();
  const privateKey = envContent.match(/FIREBASE_PRIVATE_KEY="(.+)"/s)?.[1]?.trim();
  
  let allGood = true;
  
  // Check Project ID
  if (projectId && projectId !== '' && !projectId.includes('PASTE')) {
    console.log('✅ FIREBASE_PROJECT_ID is set:', projectId);
  } else {
    console.log('❌ FIREBASE_PROJECT_ID is missing or not configured');
    allGood = false;
  }
  
  // Check Client Email
  if (clientEmail && clientEmail !== '' && !clientEmail.includes('PASTE') && clientEmail.includes('@')) {
    console.log('✅ FIREBASE_CLIENT_EMAIL is set:', clientEmail);
  } else {
    console.log('❌ FIREBASE_CLIENT_EMAIL is missing or not configured');
    console.log('   Current value:', clientEmail || '(empty)');
    allGood = false;
  }
  
  // Check Private Key
  if (privateKey && privateKey.includes('BEGIN PRIVATE KEY') && !privateKey.includes('PASTE')) {
    console.log('✅ FIREBASE_PRIVATE_KEY is set (length:', privateKey.length, 'characters)');
  } else {
    console.log('❌ FIREBASE_PRIVATE_KEY is missing or not configured');
    if (privateKey) {
      console.log('   First 50 chars:', privateKey.substring(0, 50) + '...');
    } else {
      console.log('   Current value: (empty)');
    }
    allGood = false;
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  if (allGood) {
    console.log('🎉 All Firebase credentials are configured correctly!');
    console.log('✅ You can now run: npm run dev');
  } else {
    console.log('⚠️  Firebase credentials are NOT configured correctly.\n');
    console.log('📝 To fix this:\n');
    console.log('1. Go to: https://console.firebase.google.com/project/interview-ninja-36875/settings/serviceaccounts/adminsdk');
    console.log('2. Click "Generate New Private Key"');
    console.log('3. Download the JSON file');
    console.log('4. Copy the values to .env.local file');
    console.log('5. Run this script again: node check-env.js');
  }
  
  console.log('\n');
  
} catch (error) {
  console.error('❌ Error reading .env.local file:', error.message);
  console.log('\n💡 Make sure .env.local file exists in the project root.\n');
}
