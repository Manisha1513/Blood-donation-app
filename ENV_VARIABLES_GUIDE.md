# 🔐 Environment Variables Guide

This document explains all environment variables used in the Blood Donation Management System.

## ⚠️ IMPORTANT SECURITY NOTES

1. **NEVER commit `.env` files to Git** - They contain sensitive credentials
2. **Use `.env.example` as templates** - These are safe to commit
3. **Rotate secrets regularly** - Especially after team member changes
4. **Use different values for dev/prod** - Never use production credentials in development

---

## 📋 Backend Environment Variables

### Database Configuration

#### `DATABASE_URL`
- **Description**: PostgreSQL database connection string
- **Format**: `postgresql://username:password@host:port/database`
- **Local Example**: `postgresql://postgres:password@localhost:5432/blood_donation`
- **Production Example**: `postgresql://user:pass@dpg-xxxxx.oregon-postgres.render.com/blood_donation`
- **Required**: ✅ Yes
- **Where to get**: 
  - Local: Your PostgreSQL installation
  - Production: Render/Railway/Heroku database dashboard

#### `MONGODB_URL`
- **Description**: MongoDB database connection string
- **Format**: `mongodb://host:port/database` or `mongodb+srv://user:pass@cluster/database`
- **Local Example**: `mongodb://localhost:27017/bloodconnect`
- **Production Example**: `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/bloodconnect`
- **Required**: ✅ Yes
- **Where to get**:
  - Local: Your MongoDB installation
  - Production: [MongoDB Atlas](https://cloud.mongodb.com)

---

### JWT Configuration

#### `JWT_SECRET`
- **Description**: Secret key for signing JWT tokens
- **Format**: Random string (minimum 32 characters recommended)
- **Example**: `a8f5f167f44f4964e6c998dee827110c`
- **Required**: ✅ Yes
- **How to generate**:
  ```bash
  # Option 1: OpenSSL
  openssl rand -base64 32
  
  # Option 2: Node.js
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  
  # Option 3: Online
  # https://randomkeygen.com/
  ```
- **⚠️ CRITICAL**: Use different secrets for dev and production!

#### `JWT_EXPIRES_IN`
- **Description**: Token expiration time
- **Format**: Time string (e.g., `30m`, `1h`, `7d`)
- **Default**: `30m`
- **Required**: ❌ No (has default)
- **Recommendations**:
  - Development: `7d` (convenient)
  - Production: `30m` to `1h` (secure)

---

### Email Configuration (Gmail SMTP)

#### `EMAIL_HOST`
- **Description**: SMTP server hostname
- **Value**: `smtp.gmail.com`
- **Required**: ✅ Yes (for email features)

#### `EMAIL_PORT`
- **Description**: SMTP server port
- **Value**: `587` (TLS) or `465` (SSL)
- **Required**: ✅ Yes (for email features)

#### `EMAIL_USER`
- **Description**: Gmail address for sending emails
- **Format**: `your-email@gmail.com`
- **Required**: ✅ Yes (for email features)
- **Example**: `bloodconnect.app@gmail.com`

#### `EMAIL_PASS`
- **Description**: Gmail App Password (NOT regular password!)
- **Format**: 16-character password (spaces optional)
- **Example**: `abcd efgh ijkl mnop`
- **Required**: ✅ Yes (for email features)
- **How to get**:
  1. Enable 2-Step Verification on your Google Account
  2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
  3. Select "Mail" and "Other (Custom name)"
  4. Generate and copy the password
- **⚠️ NOTE**: Regular Gmail password will NOT work!

---

### Google OAuth Configuration

#### `GOOGLE_CLIENT_ID`
- **Description**: Google OAuth 2.0 Client ID
- **Format**: `xxxxx.apps.googleusercontent.com`
- **Example**: `123456789-abcdefg.apps.googleusercontent.com`
- **Required**: ✅ Yes (for Google login)
- **Where to get**: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- **Setup Steps**:
  1. Create project in Google Cloud Console
  2. Enable Google+ API
  3. Create OAuth 2.0 Client ID
  4. Add authorized origins and redirect URIs
- **⚠️ MUST match frontend's `VITE_GOOGLE_CLIENT_ID`**

#### `GOOGLE_CLIENT_SECRET`
- **Description**: Google OAuth 2.0 Client Secret
- **Format**: Random string
- **Example**: `GOCSPX-xxxxxxxxxxxxxxxxxxxxx`
- **Required**: ✅ Yes (for Google login)
- **Where to get**: Same as Client ID (shown after creation)
- **⚠️ KEEP SECRET**: Never expose in frontend or public repos!

---

### Twilio Configuration (Optional)

#### `TWILIO_ACCOUNT_SID`
- **Description**: Twilio Account SID
- **Format**: `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- **Required**: ❌ No (SMS features will be disabled)
- **Where to get**: [Twilio Console](https://console.twilio.com)

#### `TWILIO_AUTH_TOKEN`
- **Description**: Twilio Auth Token
- **Format**: Random string
- **Required**: ❌ No (SMS features will be disabled)
- **Where to get**: [Twilio Console](https://console.twilio.com)

#### `TWILIO_PHONE_NUMBER`
- **Description**: Twilio phone number for sending SMS
- **Format**: `+1234567890` (E.164 format)
- **Required**: ❌ No (SMS features will be disabled)
- **Where to get**: Purchase from Twilio Console

---

### Server Configuration

#### `PORT`
- **Description**: Port for backend server
- **Default**: `3001`
- **Required**: ❌ No (has default)
- **Note**: Cloud platforms (Render, Railway) will override this

#### `FRONTEND_URL`
- **Description**: Frontend URL for CORS configuration
- **Local**: `http://localhost:3000`
- **Production**: `https://your-app.vercel.app`
- **Required**: ✅ Yes
- **⚠️ IMPORTANT**: Must match your actual frontend URL!

---

## 📋 Frontend Environment Variables

### `VITE_GOOGLE_CLIENT_ID`
- **Description**: Google OAuth 2.0 Client ID (same as backend)
- **Format**: `xxxxx.apps.googleusercontent.com`
- **Required**: ✅ Yes (for Google login)
- **⚠️ MUST match backend's `GOOGLE_CLIENT_ID`**

### `VITE_API_URL`
- **Description**: Backend API base URL
- **Local Development**: Leave empty or omit (Vite proxy handles it)
- **Production**: `https://your-backend.onrender.com`
- **Required**: ✅ Yes (for production)
- **Examples**:
  - Development: `` (empty)
  - Production: `https://blood-donation-api.onrender.com`

---

## 🚀 Platform-Specific Setup

### Vercel (Frontend)

1. Go to **Settings** → **Environment Variables**
2. Add:
   - `VITE_GOOGLE_CLIENT_ID`
   - `VITE_API_URL`
3. Click **Save**
4. Redeploy from **Deployments** tab

### Render (Backend)

1. Go to **Environment** tab
2. Add all backend variables
3. Click **Save Changes**
4. Service will auto-redeploy

### Railway (Backend)

1. Go to **Variables** tab
2. Add all backend variables
3. Click **Deploy**

### MongoDB Atlas

1. Go to **Network Access**
2. Add IP: `0.0.0.0/0` (allow from anywhere)
3. Or add specific IPs from your hosting provider

---

## ✅ Verification Checklist

Before deploying, verify:

### Backend
- [ ] `DATABASE_URL` connects successfully
- [ ] `MONGODB_URL` connects successfully
- [ ] `JWT_SECRET` is strong and unique
- [ ] `EMAIL_USER` and `EMAIL_PASS` are correct
- [ ] `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are valid
- [ ] `FRONTEND_URL` matches your frontend deployment

### Frontend
- [ ] `VITE_GOOGLE_CLIENT_ID` matches backend
- [ ] `VITE_API_URL` points to backend (production only)

### Google Cloud Console
- [ ] Authorized JavaScript origins include your frontend URL
- [ ] Authorized redirect URIs include your frontend URL
- [ ] Google+ API is enabled

---

## 🔄 Environment-Specific Values

### Development

```env
# Backend
DATABASE_URL=postgresql://postgres:password@localhost:5432/blood_donation
MONGODB_URL=mongodb://localhost:27017/bloodconnect
JWT_SECRET=dev-secret-change-in-production
FRONTEND_URL=http://localhost:3000

# Frontend
VITE_API_URL=
```

### Production

```env
# Backend
DATABASE_URL=postgresql://user:pass@prod-host/blood_donation
MONGODB_URL=mongodb+srv://user:pass@cluster/bloodconnect
JWT_SECRET=<strong-random-production-secret>
FRONTEND_URL=https://your-app.vercel.app

# Frontend
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🆘 Troubleshooting

### "Database connection failed"
- Check `DATABASE_URL` format
- Verify database is running
- Check network access (MongoDB Atlas whitelist)

### "JWT malformed" or "Invalid token"
- Verify `JWT_SECRET` is the same across all backend instances
- Check token hasn't expired

### "Google OAuth failed"
- Verify `GOOGLE_CLIENT_ID` matches in frontend and backend
- Check authorized origins in Google Cloud Console
- Clear browser cache

### "Email not sending"
- Verify using Gmail App Password (not regular password)
- Check 2-Step Verification is enabled
- Test with a simple email first

### "CORS error"
- Verify `FRONTEND_URL` in backend matches actual frontend URL
- Check CORS configuration in `backend/src/app.ts`

---

## 📞 Need Help?

- Check `SETUP_GUIDE.md` for step-by-step instructions
- Review `README.md` for general documentation
- Open an issue on GitHub

---

**Remember**: Security is everyone's responsibility! 🔒
