const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

console.log(`${colors.bright}${colors.yellow}Starting Bazaario...${colors.reset}\n`);

// Check if .env file exists, if not, create a default one
const serverPath = path.join(__dirname, 'server');
const envPath = path.join(serverPath, '.env');

if (!fs.existsSync(envPath)) {
  console.log(`${colors.yellow}No .env file found. Creating default .env file...${colors.reset}`);
  const defaultEnv = 
`PORT=5001
MONGO_URI=mongodb://localhost:27017/bazaario
JWT_SECRET=your_jwt_secret`;
  
  fs.writeFileSync(envPath, defaultEnv);
  console.log(`${colors.green}Default .env file created at ${envPath}${colors.reset}`);
}

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

// Read server port from .env file
let serverPort = 5001; // Default port
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const portMatch = envContent.match(/PORT=(\d+)/);
  if (portMatch && portMatch[1]) {
    serverPort = parseInt(portMatch[1], 10);
  }
} catch (err) {
  console.error(`${colors.red}Error reading .env file: ${err.message}${colors.reset}`);
}

// Display API URL
console.log(`${colors.cyan}API will be available at: ${colors.reset}${clickableLink(`http://localhost:${serverPort}/api`)}\n`);

// Start backend server
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
        console.log(`${colors.bright}${colors.blue}🔗 API is available at: ${colors.reset}${clickableLink(`http://localhost:${serverPort}/api`)}`);
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