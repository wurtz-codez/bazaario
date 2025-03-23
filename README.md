# BAZAARIO

BAZAARIO is a multi-vendor platform built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to create and manage multiple websites for selling products, similar to Shopify.

## Features

- User authentication (register, login, profile management)
- Dashboard with overview of websites, orders, and revenue
- Website creation and management with customizable templates
- Order management system
- Analytics with chart visualization options (pie charts, line graphs)
- Template browsing by category (restaurants, e-commerce, clothing, etc.)

## Tech Stack

- **Frontend**: React.js with Material UI, Chart.js for data visualization
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ORM
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
```
git clone https://github.com/wurtz-codez/bazario.git
cd bazario
```

2. Install all dependencies at once
```
cd project
npm run install-all
```

Or install dependencies individually:

```
# Install server dependencies
cd project/server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bazaario
JWT_SECRET=your_jwt_secret
```

### Running the Application

#### Easy Start (Recommended)
Use our improved start script that runs both server and client with clickable terminal links:

```
cd project
npm start
```

The terminal will display clickable links to access the application.

#### Manual Start
Alternatively, you can start the server and client manually:

1. Start the server
```
cd project/server
npm run dev
```

2. Start the client
```
cd project/client
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Login Credentials
Email: demo@bazaario.com
Password: password123
Alternatively, you can register with any email and password since we've set up a mock registration function that will bypass the server.

## Project Structure

- `/client` - React frontend
  - `/src` - Source code
    - `/components` - Reusable UI components
    - `/pages` - Main application pages
    - `/context` - React context for state management
    - `/utils` - Utility functions
- `/server` - Node.js backend
  - `/controllers` - Request handlers
  - `/models` - MongoDB schema models
  - `/routes` - API routes
  - `/middleware` - Custom middleware

## License

This project is licensed under the MIT License. 