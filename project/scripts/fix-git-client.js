const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Setup readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Define paths
const projectRoot = path.resolve(__dirname, '..');
const clientDir = path.join(projectRoot, 'client');
const gitignorePath = path.join(projectRoot, '.gitignore');

console.log('=== Git Client Folder Fix Tool ===');

// Helper function to execute commands
function runCommand(cmd, options = {}) {
  console.log(`> ${cmd}`);
  try {
    return execSync(cmd, { 
      cwd: projectRoot, 
      encoding: 'utf8',
      stdio: ['inherit', 'pipe', 'pipe'],
      ...options
    }).trim();
  } catch (error) {
    console.error(`Error executing command: ${cmd}`);
    console.error(error.message);
    if (error.stdout) console.log(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
    return null;
  }
}

// Fix 1: Create client directory if it doesn't exist
function ensureClientDirectoryExists() {
  console.log('\n1. Ensuring client directory exists...');
  if (!fs.existsSync(clientDir)) {
    console.log('Creating client directory...');
    fs.mkdirSync(clientDir, { recursive: true });
    console.log('✅ Client directory created');
  } else {
    console.log('✅ Client directory already exists');
  }
}

// Fix 2: Remove nested Git repository in client if it exists
function removeNestedGitRepo() {
  console.log('\n2. Checking for nested Git repository...');
  const clientGitDir = path.join(clientDir, '.git');
  if (fs.existsSync(clientGitDir)) {
    console.log('Found nested Git repository in client directory');
    
    rl.question('Do you want to remove the nested .git directory? (y/n) ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          fs.rmSync(clientGitDir, { recursive: true, force: true });
          console.log('✅ Removed nested .git directory');
          fixGitignore();
        } catch (error) {
          console.error('❌ Error removing .git directory:', error.message);
          console.log('   Please manually delete the directory at:', clientGitDir);
          fixGitignore();
        }
      } else {
        console.log('Skipping removal of nested Git repository');
        fixGitignore();
      }
    });
  } else {
    console.log('✅ No nested Git repository found');
    fixGitignore();
  }
}

// Fix 3: Update .gitignore file
function fixGitignore() {
  console.log('\n3. Checking .gitignore file...');
  
  if (fs.existsSync(gitignorePath)) {
    let gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    const lines = gitignoreContent.split('\n');
    
    // Find lines that ignore the client directory
    const clientIgnores = lines.filter(line => {
      const trimmedLine = line.trim();
      return (trimmedLine === 'client' || 
             trimmedLine === '/client' || 
             trimmedLine === 'client/' || 
             trimmedLine === '/client/');
    });
    
    if (clientIgnores.length > 0) {
      console.log('Found client ignores in .gitignore:', clientIgnores);
      
      rl.question('Do you want to remove client ignores from .gitignore? (y/n) ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          const updatedContent = lines
            .filter(line => !clientIgnores.includes(line))
            .join('\n');
          
          fs.writeFileSync(gitignorePath, updatedContent);
          console.log('✅ Updated .gitignore file');
        } else {
          console.log('Skipping .gitignore update');
        }
        
        ensureClientHasFiles();
      });
    } else {
      console.log('✅ No client ignores found in .gitignore');
      ensureClientHasFiles();
    }
  } else {
    console.log('ℹ️ No .gitignore file found');
    ensureClientHasFiles();
  }
}

// Fix 4: Add at least one file to client directory to ensure it gets tracked
function ensureClientHasFiles() {
  console.log('\n4. Ensuring client directory has files for tracking...');
  
  const clientFiles = fs.readdirSync(clientDir);
  
  if (clientFiles.length === 0) {
    console.log('Client directory is empty, adding .gitkeep file...');
    fs.writeFileSync(
      path.join(clientDir, '.gitkeep'),
      '# This file ensures the client directory is tracked by Git\n'
    );
    console.log('✅ Added .gitkeep file to client directory');
  } else {
    console.log('✅ Client directory already has files');
  }
  
  trackClientFiles();
}

// Fix 5: Ensure client files are tracked by Git
function trackClientFiles() {
  console.log('\n5. Adding client directory to Git...');
  
  // Make sure client folder and contents are added to git
  const result = runCommand('git add client/');
  
  if (result !== null) {
    console.log('✅ Client directory added to Git');
    
    // Check if there are changes to commit
    const hasChanges = runCommand('git status --porcelain client/');
    
    if (hasChanges) {
      rl.question('Do you want to commit the changes to the client directory? (y/n) ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          const commitResult = runCommand('git commit -m "Fix client folder tracking issues"');
          if (commitResult !== null) {
            console.log('✅ Changes committed successfully');
          }
          finishUp();
        } else {
          console.log('Skipping commit. Don\'t forget to commit changes later.');
          finishUp();
        }
      });
    } else {
      console.log('No changes to commit for client directory');
      finishUp();
    }
  } else {
    console.log('❌ Failed to add client directory to Git');
    finishUp();
  }
}

// Add a README file to client directory for better visibility
function addReadme() {
  const readmePath = path.join(clientDir, 'README.md');
  
  if (!fs.existsSync(readmePath)) {
    console.log('\nAdding README.md to client directory for better visibility...');
    
    const readmeContent = `# Client Application

This directory contains the client-side application for Bazario.

## Directory Structure

- \`src/\` - Source code
- \`public/\` - Static assets
- \`build/\` - Production build output (not committed to Git)

## Getting Started

Install dependencies:
\`\`\`
npm install
\`\`\`

Start the development server:
\`\`\`
npm start
\`\`\`

Build for production:
\`\`\`
npm run build
\`\`\`

## Important Note

This directory is now properly tracked by Git. If you previously had issues with this directory not being included in Git operations, they should now be resolved.
`;

    fs.writeFileSync(readmePath, readmeContent);
    console.log('✅ Added README.md to client directory');
    
    // Add it to Git
    runCommand('git add client/README.md');
  }
}

function finishUp() {
  addReadme();
  
  console.log('\n=== Fix Complete ===');
  console.log('\nRemember to push your changes to GitHub:');
  console.log('  git push');
  
  rl.close();
}

// Start the fix process
ensureClientDirectoryExists();
removeNestedGitRepo();
