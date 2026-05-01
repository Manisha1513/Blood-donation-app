# 🚀 Localhost Quick Start

## ⚡ 3-Step Setup

### 1️⃣ Install Prerequisites
- **Node.js**: https://nodejs.org/
- **PostgreSQL**: https://www.postgresql.org/download/windows/
- **MongoDB**: https://www.mongodb.com/try/download/community

### 2️⃣ Create Database
```bash
psql -U postgres
CREATE DATABASE blood_donation;
\q
```

### 3️⃣ Start Everything
```bash
# Option A: Use startup script (Windows)
start-local.bat

# Option B: Manual start
# Terminal 1
cd backend
npm install
npm run migrate
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev
```

## ✅ Access Your App

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001/api/health

---

## 🔧 Configuration (Already Done!)

### Backend `.env`
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/blood_donation
MONGODB_URL=mongodb://localhost:27017/bloodconnect
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_API_URL=
```

---

## 🐛 Quick Fixes

### PostgreSQL not connecting?
```bash
# Start PostgreSQL service
services.msc → PostgreSQL → Start
```

### MongoDB not connecting?
```bash
# Start MongoDB service
services.msc → MongoDB Server → Start
```

### Port 3001 already in use?
```bash
# Find and kill process
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

---

## 📚 Full Documentation

See `LOCAL_SETUP.md` for complete setup guide.

---

**That's it! Your app runs 100% on localhost.** 🎉
