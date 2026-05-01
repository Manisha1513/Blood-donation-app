# 🚀 Quick Setup Guide

This guide will help you set up the Blood Donation Management System on your local machine.

## ⚡ Quick Start (5 Minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Manisha1513/Blood-donation-app.git
cd Blood-donation-app
```

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `backend/.env`** with your actual credentials:

```env
# Database URLs
DATABASE_URL=postgresql://postgres:password@localhost:5432/blood_donation
MONGODB_URL=mongodb://localhost:27017/bloodconnect

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secure-random-string-here

# Gmail Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Google OAuth (get from Google Cloud Console)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `frontend/.env`**:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
VITE_API_URL=
```

**Note**: Leave `VITE_API_URL` empty for local development.

### Step 4: Setup Databases

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
# Start MongoDB service
# Windows: net start MongoDB
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod

# Or use MongoDB Atlas (cloud) - free tier available
# Get connection string from: https://cloud.mongodb.com
```

### Step 5: Run Migrations

```bash
cd backend
npm run migrate
```

### Step 6: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 7: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

---

## 🔑 Getting Required Credentials

### 1. Google OAuth Client ID & Secret

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Authorized JavaScript origins:
   - `http://localhost:3000`
   - `https://your-vercel-domain.vercel.app`
7. Authorized redirect URIs:
   - `http://localhost:3000`
   - `https://your-vercel-domain.vercel.app`
8. Copy **Client ID** and **Client Secret**

### 2. Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (required)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select app: **Mail**
5. Select device: **Other** (enter "Blood Donation App")
6. Click **Generate**
7. Copy the 16-character password

### 3. Twilio (Optional - for SMS)

1. Sign up at [Twilio](https://www.twilio.com/try-twilio)
2. Get free trial credits
3. Copy **Account SID**, **Auth Token**, and **Phone Number**

---

## 🐛 Troubleshooting

### Database Connection Failed

**PostgreSQL:**
```bash
# Check if PostgreSQL is running
# Windows: services.msc → PostgreSQL
# Mac: brew services list
# Linux: sudo systemctl status postgresql

# Test connection
psql -U postgres -d blood_donation
```

**MongoDB:**
```bash
# Check if MongoDB is running
# Windows: services.msc → MongoDB
# Mac: brew services list
# Linux: sudo systemctl status mongod

# Test connection
mongosh
```

### Port Already in Use

```bash
# Find process using port 3001 (backend)
# Windows: netstat -ano | findstr :3001
# Mac/Linux: lsof -i :3001

# Kill the process
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### Google OAuth Not Working

1. Verify `GOOGLE_CLIENT_ID` matches in both frontend and backend `.env`
2. Check authorized origins in Google Cloud Console
3. Clear browser cache and cookies
4. Restart both frontend and backend servers

### Email Not Sending

1. Verify Gmail App Password (not regular password)
2. Check 2-Step Verification is enabled
3. Test with a simple email first
4. Check spam folder

---

## 📦 Production Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. **New** → **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Environment**: Add all variables from `backend/.env.example`
6. Click **Create Web Service**

### Deploy Frontend to Vercel

```bash
cd frontend
npm install -g vercel
vercel
```

Or use Vercel Dashboard:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. **Import Project** → Select your GitHub repo
3. **Root Directory**: `frontend`
4. **Framework Preset**: Vite
5. **Environment Variables**: Add from `frontend/.env.example`
6. Click **Deploy**

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend server starts without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Database connections successful
- [ ] User registration works
- [ ] Email/password login works
- [ ] Google OAuth login works
- [ ] Profile page loads
- [ ] Blood banks page shows data
- [ ] Donation camps page shows data
- [ ] Admin login works

---

## 📚 Next Steps

1. **Customize**: Update branding, colors, and content
2. **Test**: Run test suite with `npm test`
3. **Deploy**: Follow production deployment guide
4. **Monitor**: Set up error tracking (Sentry, LogRocket)
5. **Scale**: Add caching, CDN, and load balancing

---

## 🆘 Need Help?

- **Documentation**: Check `README.md` for detailed info
- **Issues**: Open an issue on GitHub
- **Email**: Contact the maintainers

---

**Happy Coding! 🩸💻**
