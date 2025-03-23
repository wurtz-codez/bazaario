# Bazario Client Application

This directory contains the client-side React application for the Bazario project.

## Project Structure

- `src/` - Source code for the React application
  - `components/` - Reusable UI components
  - `pages/` - Page components
  - `context/` - React context providers
  - `utils/` - Utility functions and helpers
  - `assets/` - Static assets like images and icons
  - `hooks/` - Custom React hooks
  - `styles/` - Global styles and theme configuration
- `public/` - Static files that will be served directly
- `build/` - Production build output (generated, not committed to Git)

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
```

### Development

```bash
# Start development server
npm start
# or
yarn start
```

This will run the app in development mode, available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
# Create production build
npm run build
# or
yarn build
```

## Integration with Server

The client application communicates with the server API located in the `../server` directory. The proxy configuration in `package.json` allows API requests to be forwarded to the server during development.

## Troubleshooting Git Issues

If you encounter issues where the client folder is not being tracked by Git:

1. Run the diagnosis script:
   ```
   node scripts/git-client-diagnosis.js
   ```

2. Fix any issues with:
   ```
   node scripts/fix-git-client.js
   ```

3. Ensure the client folder has been committed and pushed:
   ```
   git add client/
   git commit -m "Update client files"
   git push
   ```

## Learn More

- [React documentation](https://reactjs.org/)
- [Create React App documentation](https://create-react-app.dev/)
- [Material-UI documentation](https://mui.com/)
