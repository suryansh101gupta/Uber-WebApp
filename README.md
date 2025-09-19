# Uber WebApp

A full-stack ride-sharing application similar to Uber, built with React frontend and Node.js backend, featuring real-time tracking, user authentication, and interactive maps.

## 🚀 Features

- **Dual User Interface**: Separate interfaces for passengers and drivers (captains)
- **Real-time Tracking**: Live ride tracking with Socket.io
- **Interactive Maps**: Google Maps integration for location services
- **Authentication**: JWT-based authentication for both users and drivers
- **Vehicle Selection**: Support for bike, car, and auto ride options
- **Responsive Design**: Modern UI with Tailwind CSS
- **Ride Management**: Complete ride lifecycle from booking to completion

## 🏗️ Architecture

```
Uber-WebApp/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   └── assets/        # Static assets
│   └── package.json
├── backend/           # Node.js backend API
│   ├── controllers/   # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **Tailwind CSS 4.1.12** - Styling framework
- **Google Maps API** - Maps integration
- **Socket.io Client** - Real-time communication
- **React Router DOM** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time communication
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Google Maps API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Uber-WebApp
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=4000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API=your_google_maps_api_key
```

Start the backend server:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Start the frontend development server:
```bash
npm run dev
```

### 4. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📱 User Interfaces

### Passenger Interface
- **Authentication**: User registration and login
- **Home Page**: Book rides, select vehicle type, set pickup/destination
- **Ride Tracking**: Real-time driver location and ETA
- **Ride History**: View past rides

### Driver Interface (Captain)
- **Authentication**: Driver registration and login
- **Dashboard**: View available rides, manage status
- **Ride Management**: Accept rides, navigate to passengers
- **Earnings**: Track ride earnings and history

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=4000
DB_CONNECT=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GOOGLE_MAPS_API=your_google_maps_api_key
```

### Frontend (.env)
```env
VITE_BASE_URL=http://localhost:5000
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

## 📚 API Documentation

The backend provides RESTful APIs for:

- **User Management**: `/users/*` - Registration, login, profile
- **Captain Management**: `/captain/*` - Driver registration, login, profile
- **Ride Management**: `/rides/*` - Create, track, manage rides
- **Maps Integration**: `/maps/*` - Location services

Detailed API documentation is available in the [backend README](./backend/README.md).

## 🗄️ Database Schema

### User Model
- Personal information (name, email)
- Authentication data (hashed password)
- Ride history

### Captain Model
- Personal information (name, email)
- Vehicle details (plate, color, capacity, type)
- Authentication data
- Ride history and earnings

### Ride Model
- User and captain references
- Pickup and destination locations
- Ride status and timing
- Fare information

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Token blacklisting for secure logout
- CORS configuration
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB database (MongoDB Atlas recommended)
2. Configure environment variables
3. Deploy to platforms like Heroku, Railway, or AWS

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist/` folder to platforms like Vercel, Netlify, or AWS S3

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the individual README files in `frontend/` and `backend/` directories
- Review the API documentation
- Open an issue in the repository

## 🔮 Future Enhancements

- Payment integration
- Push notifications
- Advanced ride scheduling
- Multi-language support
- Admin dashboard
- Analytics and reporting
