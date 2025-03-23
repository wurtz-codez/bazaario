const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Define paths
const projectRoot = path.resolve(__dirname, '..');
const clientDir = path.join(projectRoot, 'client');
const gitignorePath = path.join(projectRoot, '.gitignore');

console.log('=== Git Client Folder Diagnosis ===');
console.log(`Project root: ${projectRoot}`);
console.log(`Client directory: ${clientDir}`);

// Check if client directory exists
console.log('\n1. Checking if client directory exists...');
if (fs.existsSync(clientDir)) {
  console.log('✅ Client directory exists');
  
  // Check if directory has content
  const clientFiles = fs.readdirSync(clientDir);
  console.log(`   Contains ${clientFiles.length} files/directories`);
  
  if (clientFiles.length === 0) {
    console.log('❌ Client directory is empty - Git does not track empty directories');
    console.log('   Solution: Add at least one file to the client directory');
  } else {
    console.log('✅ Client directory has content');
    console.log('   First 5 items:', clientFiles.slice(0, 5).join(', '));
  }
} else {
  console.log('❌ Client directory does not exist');
  console.log('   Solution: Create the client directory');
}

// Check for nested Git repository
console.log('\n2. Checking for nested Git repository...');
const clientGitDir = path.join(clientDir, '.git');
if (fs.existsSync(clientGitDir)) {
  console.log('❌ Client folder is a nested Git repository');
  console.log('   Solution: Either set up as a proper Git submodule or remove the nested .git directory');
} else {
  console.log('✅ Client is not a nested Git repository');
}

// Check .gitignore
console.log('\n3. Checking .gitignore file...');
if (fs.existsSync(gitignorePath)) {
  const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
  const lines = gitignoreContent.split('\n');
  
  const clientIgnores = lines.filter(line => {
    const trimmedLine = line.trim();
    // Check for exact matches or patterns that would include client directory
    return (trimmedLine === 'client' || 
           trimmedLine === '/client' || 
           trimmedLine === 'client/' || 
           trimmedLine === '/client/');
  });
  
  if (clientIgnores.length > 0) {
    console.log('❌ Client folder is explicitly ignored in .gitignore');
    console.log('   Ignoring patterns found:', clientIgnores.join(', '));
    console.log('   Solution: Remove these entries from .gitignore');
  } else {
    console.log('✅ Client folder is not explicitly ignored in .gitignore');
  }
  
  // Check for patterns that might also match client
  const potentialIgnores = lines.filter(line => {
    const trimmedLine = line.trim();
    return trimmedLine && !trimmedLine.startsWith('#') && 
           trimmedLine.includes('client') && !clientIgnores.includes(trimmedLine);
  });
  
  if (potentialIgnores.length > 0) {
    console.log('⚠️ Found potential patterns in .gitignore that might match client folder:');
    potentialIgnores.forEach(pattern => console.log(`   - ${pattern}`));
    console.log('   Review these patterns to ensure they don\'t accidentally ignore client files');
  }
} else {
  console.log('ℹ️ No .gitignore file found');
}

// Check Git status for client directory
console.log('\n4. Checking Git tracking status for client directory...');
try {
  const trackedFiles = execSync('git ls-files client/', { cwd: projectRoot, encoding: 'utf8' }).trim().split('\n');
  
  if (trackedFiles.length > 0 && trackedFiles[0] !== '') {
    console.log(`✅ Git is tracking ${trackedFiles.length} files in client directory`);
  } else {
    console.log('❌ No files in client directory are being tracked by Git');
    console.log('   Solution: Add and commit client files to Git');
  }
  
  // Check for untracked files
  const untrackedOutput = execSync('git ls-files --others --exclude-standard client/', 
    { cwd: projectRoot, encoding: 'utf8' }).trim();
  
  if (untrackedOutput) {
    const untrackedFiles = untrackedOutput.split('\n');
    console.log(`⚠️ Found ${untrackedFiles.length} untracked files in client directory`);
    console.log('   Solution: Run "git add client/" to stage these files');
  }
  
  // Check for uncommitted changes
  const changedFiles = execSync('git diff --name-only client/', 
    { cwd: projectRoot, encoding: 'utf8' }).trim();
  
  if (changedFiles) {
    console.log('⚠️ There are uncommitted changes in client directory');
    console.log('   Solution: Commit these changes with "git commit -m \'Update client files\'"');
  }
  
} catch (error) {
  console.log('❌ Error checking Git status:', error.message);
}

console.log('\n=== Diagnosis Complete ===');
