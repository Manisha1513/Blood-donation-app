# 🏠 Local Development Setup

This guide will help you run the Blood Donation Management System on your local machine.

## 📋 Prerequisites

Install these on your Windows machine:

1. **Node.js 18+**: https://nodejs.org/
2. **PostgreSQL 14+**: https://www.postgresql.org/download/windows/
3. **MongoDB 6+**: https://www.mongodb.com/try/download/community
4. **Git**: https://git-scm.com/download/win

---

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manisha1513/Blood-donation-app.git
cd Blood-donation-app
```

### Step 2: Setup PostgreSQL Database

1. **Open pgAdmin** (installed with PostgreSQL)
2. **Create a new database**:
   - Right-click "Databases" → Create → Database
   - Database name: `blood_donation`
   - Owner: `postgres`
   - Click "Save"

Or use command line:
```bash
psql -U postgres
CREATE DATABASE blood_donation;
\q
```

### Step 3: Setup MongoDB

1. **Start MongoDB service**:
   - Press `Win + R`
   - Type: `services.msc`
   - Find "MongoDB Server"
   - Right-click → Start

Or use command line:
```bash
net start MongoDB
```

2. **Verify MongoDB is running**:
   - Open MongoDB Compass
   - Connect to: `mongodb://localhost:27017`
   - Should connect successfully

### Step 4: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# The .env file is already configured for local development
# Verify it has these settings:
# DATABASE_URL=postgresql://postgres:password@localhost:5432/blood_donation
# MONGODB_URL=mongodb://localhost:27017/bloodconnect

# Run database migrations
npm run migrate

# Start backend server
npm run dev
```

**Backend will run on**: http://localhost:3001

### Step 5: Setup Frontend

Open a NEW terminal:

```bash
cd frontend

# Install dependencies
npm install

# The .env file is already configured for local development
# Verify it has:
# VITE_API_URL=
# (empty means it uses Vite proxy to localhost:3001)

# Start frontend server
npm run dev
```

**Frontend will run on**: http://localhost:3000

---

## ✅ Verify Everything Works

### 1. Check Backend Health

Open browser: http://localhost:3001/api/health

Should see:
```json
{"status":"ok","timestamp":"2026-05-01T..."}
```

### 2. Check Frontend

Open browser: http://localhost:3000

Should see the homepage.

### 3. Check Database Connections

Look at backend terminal logs:

```
Server running on port 3001
Database connected successfully.
✓ Migration: 001_initial_schema.sql
✓ Migration: 002_password_reset.sql
...
[MongoDB] Connected to mongodb://localhost:27017/bloodconnect
All services initialized.
```

### 4. Test Registration

1. Go to: http://localhost:3000/register
2. Fill in the form
3. Click "Register"
4. Should create account successfully

---

## 🔧 Configuration Files

### Backend `.env` (already configured)

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/blood_donation
MONGODB_URL=mongodb://localhost:27017/bloodconnect
JWT_SECRET=dev-jwt-secret-change-in-production
JWT_EXPIRES_IN=30m
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env` (already configured)

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=
```

**Note**: `VITE_API_URL` is empty for local dev (Vite proxy handles it)

---

## 🐛 Troubleshooting

### PostgreSQL Connection Failed

**Error**: `ECONNREFUSED` or `Connection refused`

**Fix**:
1. Check PostgreSQL is running:
   ```bash
   # Windows
   services.msc → PostgreSQL → Start
   ```
2. Verify password in `.env` matches your PostgreSQL password
3. Test connection:
   ```bash
   psql -U postgres -d blood_donation
   ```

### MongoDB Connection Failed

**Error**: `MongoNetworkError` or `ECONNREFUSED`

**Fix**:
1. Check MongoDB is running:
   ```bash
   # Windows
   services.msc → MongoDB Server → Start
   ```
2. Test with MongoDB Compass:
   - Connect to: `mongodb://localhost:27017`

### Port Already in Use

**Error**: `Port 3001 is already in use`

**Fix**:
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Frontend Can't Connect to Backend

**Error**: `Failed to fetch` or `Network error`

**Fix**:
1. Make sure backend is running on port 3001
2. Check `VITE_API_URL` in `frontend/.env` is empty
3. Restart frontend server

---

## 📁 Project Structure

```
Blood-donation-app/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── routes/            # API endpoints
│   │   ├── migrations/        # Database migrations
│   │   ├── server.ts          # Entry point
│   │   └── ...
│   ├── .env                   # Backend config (LOCAL)
│   └── package.json
│
├── frontend/                   # Frontend app
│   ├── src/
│   │   ├── pages/             # React pages
│   │   ├── App.tsx
│   │   └── ...
│   ├── .env                   # Frontend config (LOCAL)
│   └── package.json
│
└── LOCAL_SETUP.md             # This file
```

---

## 🎯 Development Workflow

### Starting Development

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Making Changes

1. Edit code in `backend/src/` or `frontend/src/`
2. Changes auto-reload (hot reload enabled)
3. Check browser console for errors

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Run specific test
npm test -- auth.test.ts
```

---

## 🔑 Optional: Setup Google OAuth (Local)

1. Go to: https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add authorized origins:
   - `http://localhost:3000`
4. Add redirect URIs:
   - `http://localhost:3000`
5. Copy Client ID and Secret
6. Update both `backend/.env` and `frontend/.env`

---

## 📊 Database Management

### View PostgreSQL Data

```bash
# Connect to database
psql -U postgres -d blood_donation

# List tables
\dt

# View donors
SELECT * FROM donors;

# Exit
\q
```

### View MongoDB Data

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `bloodconnect`
4. Collection: `useractivities`

---

## 🎉 You're All Set!

Your app is now running locally:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **MongoDB**: localhost:27017

---

## 📞 Need Help?

- Check backend logs in terminal
- Check frontend console (F12 in browser)
- Verify all services are running
- Check `.env` files are configured correctly

**Happy Coding! 💻**
