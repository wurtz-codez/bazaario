const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m'
};

console.log(`${colors.bright}${colors.yellow}Starting Bazaario...${colors.reset}\n`);

// Function to make terminal URLs clickable based on platform
function clickableLink(url) {
  // Different terminals use different formats for clickable links
  // This supports most modern terminals
  const platform = os.platform();
  
  if (platform === 'darwin' || platform === 'linux') {
    // Terminal.app, iTerm, and most Linux terminals
    return `\u001B]8;;${url}\u0007${url}\u001B]8;;\u0007`;
  } else {
    // Windows terminals and others may not support the above format
    // Just return the URL and hope for the best
    return url;
  }
}

// Start backend server
const serverPath = path.join(__dirname, 'server');
const server = spawn('npm', ['run', 'dev'], { cwd: serverPath, shell: true });

server.stdout.on('data', (data) => {
  console.log(`${colors.cyan}[SERVER]: ${colors.reset}${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`${colors.red}[SERVER ERROR]: ${colors.reset}${data}`);
});

// Start frontend client after a short delay
setTimeout(() => {
  const clientPath = path.join(__dirname, 'client');
  const client = spawn('npm', ['start'], { cwd: clientPath, shell: true });

  client.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`${colors.green}[CLIENT]: ${colors.reset}${output}`);
    
    // Check if the output contains the localhost URL
    if (output.includes('http://localhost:')) {
      const localUrl = output.match(/http:\/\/localhost:\d+/)?.[0];
      const networkUrl = output.match(/http:\/\/\d+\.\d+\.\d+\.\d+:\d+/)?.[0];
      
      if (localUrl) {
        console.log(`\n${colors.bright}${colors.blue}🔗 Your app is running at: ${colors.reset}${clickableLink(localUrl)}`);
      }
      
      if (networkUrl) {
        console.log(`${colors.bright}${colors.blue}🔗 On your network: ${colors.reset}${clickableLink(networkUrl)}\n`);
      }
    }
  });

  client.stderr.on('data', (data) => {
    console.error(`${colors.red}[CLIENT ERROR]: ${colors.reset}${data}`);
  });
}, 2000);

// Handle process termination
process.on('SIGINT', () => {
  console.log(`\n${colors.yellow}Shutting down Bazaario...${colors.reset}`);
  server.kill();
  process.exit();
}); 