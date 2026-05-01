# 🩸 Blood Donation Management System

A comprehensive full-stack web application for managing blood donation activities, connecting donors with blood banks and hospitals.

## 🌟 Features

### For Donors
- 👤 User registration and authentication (Email/Password + Google OAuth)
- 📋 Complete donor profile management
- 🩸 Blood donation history tracking
- 📅 Donation camp discovery and registration
- 🏥 Find nearby blood banks and hospitals
- 🎁 Rewards system for regular donors
- 📱 SMS and email notifications
- ✅ Eligibility screening questionnaire

### For Blood Banks & Hospitals
- 🏦 Blood inventory management
- 📊 Real-time blood availability tracking
- 📍 Location-based services with interactive maps
- 📈 Analytics and statistics

### For Admins
- 🔐 Secure admin panel
- 👥 User management
- 🏥 Blood bank and hospital management
- 📅 Donation camp organization
- 📊 System-wide analytics and reports
- 📈 Visit tracking and statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Leaflet** for interactive maps
- **Google OAuth** for authentication
- **Axios** for API calls
- **Progressive Web App (PWA)** support

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** for relational data (users, donations, blood banks)
- **MongoDB** for notifications and logs
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email notifications
- **Twilio** for SMS notifications (optional)
- **Node-cron** for scheduled tasks

### DevOps & Tools
- **Docker** for containerization
- **Jest** for testing
- **ESLint** & **Prettier** for code quality
- **GitHub Actions** for CI/CD (optional)

## 📁 Project Structure

```
blood-donation-management/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utility functions
│   │   ├── api.ts           # API configuration
│   │   ├── auth.ts          # Authentication helpers
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   ├── .env.example         # Environment variables template
│   └── package.json
│
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Custom middleware
│   │   ├── migrations/      # Database migrations
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── __tests__/       # Test files
│   │   ├── app.ts           # Express app configuration
│   │   ├── server.ts        # Server entry point
│   │   ├── db.ts            # PostgreSQL connection
│   │   └── mongo.ts         # MongoDB connection
│   ├── .env.example         # Environment variables template
│   └── package.json
│
├── docker-compose.yml        # Docker services configuration
├── render.yaml              # Render deployment config
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **PostgreSQL** 14+
- **MongoDB** 6+
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Manisha1513/Blood-donation-app.git
cd Blood-donation-app
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your actual credentials
# nano .env  # or use your preferred editor

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your Google Client ID
# nano .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000`

### 4. Database Setup

#### PostgreSQL

```bash
# Create database
createdb blood_donation

# Or using psql
psql -U postgres
CREATE DATABASE blood_donation;
\q
```

#### MongoDB

```bash
# Start MongoDB (if installed locally)
mongod

# Or use MongoDB Atlas (cloud)
# Get connection string from: https://cloud.mongodb.com
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/blood_donation
MONGODB_URL=mongodb://localhost:27017/bloodconnect

# JWT
JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRES_IN=30m

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Server
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_API_URL=  # Leave empty for local dev
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📦 Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
# Output will be in frontend/dist/
```

## 🐳 Docker Deployment

```bash
# Start all services (PostgreSQL, MongoDB, Backend, Frontend)
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

## ☁️ Cloud Deployment

### Deploy to Render

1. Fork this repository
2. Connect your GitHub account to Render
3. Create a new Web Service from the `render.yaml` file
4. Add environment variables in Render dashboard
5. Deploy!

### Deploy Frontend to Vercel

```bash
cd frontend
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_API_URL`

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/donors/register` - Register new donor
- `POST /api/donors/login` - Login with email/password
- `POST /api/donors/google-auth` - Login with Google OAuth
- `POST /api/donors/forgot-password` - Request password reset
- `POST /api/donors/reset-password` - Reset password with token

### Donor Endpoints

- `GET /api/donors/:id/profile` - Get donor profile
- `PUT /api/donors/:id/profile` - Update donor profile
- `GET /api/donors/:id/donations` - Get donation history
- `GET /api/donors/:id/eligibility` - Check donation eligibility
- `POST /api/donors/:id/screening` - Submit screening questionnaire

### Blood Bank Endpoints

- `GET /api/blood-banks` - List all blood banks
- `GET /api/blood-banks/:id` - Get blood bank details
- `GET /api/blood-banks/:id/availability` - Get blood availability

### Hospital Endpoints

- `GET /api/hospitals` - List all hospitals
- `GET /api/hospitals/:id` - Get hospital details

### Donation Camp Endpoints

- `GET /api/donation-camps` - List upcoming camps
- `GET /api/donation-camps/:id` - Get camp details
- `POST /api/donation-camps/:id/register` - Register for camp

### Admin Endpoints

- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - System statistics
- `GET /api/admin/donors` - List all donors
- `POST /api/admin/blood-banks` - Create blood bank
- `PUT /api/admin/blood-banks/:id` - Update blood bank

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT-based authentication
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ Input validation and sanitization
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection
- ✅ Rate limiting (recommended for production)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- **Manisha** - [GitHub](https://github.com/Manisha1513)

## 🙏 Acknowledgments

- Blood donation organizations for inspiration
- Open source community for amazing tools and libraries
- All contributors who help improve this project

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Blood donation appointment scheduling
- [ ] Integration with hospital management systems
- [ ] Blockchain-based donation tracking
- [ ] AI-powered donor matching

---

Made with ❤️ for saving lives through blood donation
