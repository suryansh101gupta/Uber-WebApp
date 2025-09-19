# Uber WebApp - Frontend

A React-based frontend application for the Uber-like ride-sharing platform built with Vite, featuring real-time ride tracking and modern UI components.

## Features

- **User Authentication**: Login, registration, and profile management for passengers
- **Captain Interface**: Driver login, registration, and ride management
- **Real-time Tracking**: Live ride tracking with Socket.io integration
- **Interactive Maps**: Google Maps integration for location services
- **Responsive Design**: Modern UI with Tailwind CSS
- **Ride Management**: Book rides, track drivers, and manage ride history
- **Vehicle Selection**: Choose from bike, car, or auto options

## Tech Stack

- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.12
- **Maps**: Google Maps API (@react-google-maps/api)
- **Routing**: React Router DOM 7.8.2
- **Real-time**: Socket.io Client 4.8.1
- **Icons**: Remixicon 4.6.0
- **HTTP Client**: Axios 1.11.0

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── context/       # React context providers
│   ├── assets/        # Static assets (images, fonts)
│   ├── App.jsx        # Main app component
│   └── main.jsx       # App entry point
├── public/            # Public assets
├── index.html         # HTML template
└── vite.config.js     # Vite configuration
```

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root directory with the following variables:
```env
VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the frontend root directory with the following variables:

```env
# Backend API URL
VITE_BASE_URL=http://localhost:5000

# Google Maps API Key (required for map functionality)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

```

### Getting Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Add the API key to your `.env` file

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Key Components

### User Components
- **Home**: Main landing page with ride booking interface
- **UserLogin/UserSignup**: Authentication pages for passengers
- **Riding**: Active ride tracking interface

### Captain Components
- **CaptainHome**: Driver dashboard
- **CaptainLogin/CaptainSignup**: Driver authentication
- **CaptainRiding**: Driver ride management interface

### Shared Components
- **LocationSearchPanel**: Location search and selection
- **VechiclePanel**: Vehicle type selection
- **LiveTracking**: Real-time ride tracking
- **ConfirmRidePopUp**: Ride confirmation dialog

## Context Providers

- **UserContext**: Manages user authentication state
- **CaptainContext**: Manages driver authentication state
- **SocketContext**: Handles real-time communication

## Development

The frontend runs on port 5173 by default (Vite default). Make sure the backend server is running on port 5000 for API calls to work properly.

## Building for Production

1. Build the application:
```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Preview the production build:
```bash
npm run preview
```

## Dependencies

### Core Dependencies
- **react**: UI library
- **react-dom**: React DOM bindings
- **react-router-dom**: Client-side routing
- **axios**: HTTP client for API calls
- **socket.io-client**: Real-time communication

### UI & Styling
- **tailwindcss**: Utility-first CSS framework
- **remixicon**: Icon library
- **@react-google-maps/api**: Google Maps integration

### Development Dependencies
- **vite**: Build tool and dev server
- **@vitejs/plugin-react**: React plugin for Vite
- **eslint**: Code linting
- **@eslint/js**: ESLint configuration

## Browser Support

This application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request