#!/usr/bin/env node

/**
 * Setup Checker for ProofScore Backend
 * Checks if all dependencies and setup steps are complete
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 ProofScore Backend Setup Checker\n');
console.log('=====================================\n');

let allGood = true;

// Check Node.js version
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 18) {
    console.log(`✅ Node.js version: ${nodeVersion}`);
  } else {
    console.log(`❌ Node.js version: ${nodeVersion} (Need 18+)`);
    allGood = false;
  }
} catch (e) {
  console.log('❌ Could not check Node.js version');
  allGood = false;
}

// Check if node_modules exists (workspace setup - check both locations)
const nodeModulesPath = path.join(__dirname, 'node_modules');
const rootNodeModulesPath = path.join(__dirname, '..', 'node_modules');
const nodeModulesExists = fs.existsSync(nodeModulesPath) || fs.existsSync(rootNodeModulesPath);

if (nodeModulesExists) {
  const location = fs.existsSync(nodeModulesPath) ? 'backend' : 'root (workspace)';
  console.log(`✅ node_modules directory exists (${location})`);
} else {
  console.log('❌ node_modules directory MISSING');
  console.log('   Run: npm install');
  allGood = false;
}

// Check if Prisma client is generated (check both locations)
const prismaClientPath = path.join(__dirname, 'node_modules', '.prisma', 'client');
const rootPrismaClientPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client');
const prismaClientExists = fs.existsSync(prismaClientPath) || fs.existsSync(rootPrismaClientPath);

if (prismaClientExists) {
  console.log('✅ Prisma client generated');
} else {
  console.log('❌ Prisma client NOT generated');
  console.log('   Run: npx prisma generate');
  allGood = false;
}

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
} else {
  console.log('⚠️  .env file MISSING (will use defaults)');
}

// Check if port is available
try {
  const result = execSync('lsof -ti:3001 2>/dev/null || echo ""', { encoding: 'utf-8' });
  if (result.trim()) {
    console.log('⚠️  Port 3001 is in use');
    console.log('   You may need to stop the existing process');
  } else {
    console.log('✅ Port 3001 is available');
  }
} catch (e) {
  console.log('⚠️  Could not check port availability');
}

console.log('\n=====================================\n');

if (allGood) {
  console.log('✅ All checks passed! You can start the server with:');
  console.log('   npm run dev');
  console.log('\n   Or use the startup script:');
  console.log('   ./start.sh\n');
  process.exit(0);
} else {
  console.log('❌ Some checks failed. Please fix the issues above.\n');
  console.log('Quick fix:');
  console.log('   npm install');
  console.log('   npx prisma generate');
  console.log('   npm run dev\n');
  process.exit(1);
}
