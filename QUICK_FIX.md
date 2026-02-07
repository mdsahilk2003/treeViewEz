# Quick Fix Guide - Tree View Server Issues

## Problem 1: "Could not connect to server" Error

**Reason:** Backend server nahi chal raha hai.

**Solution:** 

### Step 1: Open NEW Terminal
VS Code mein:
1. Terminal menu → New Terminal (ya Ctrl + Shift + `)
2. Ya existing terminal mein "+" button click karein

### Step 2: Backend Server Start Karein
```bash
cd e:\treeViewEz
node api/server.js
```

**Success Message:**
```
🚀 Server running on http://localhost:5000
📝 Using in-memory storage
```

### Step 3: Frontend Refresh Karein
Browser mein page refresh karein - error gayab ho jayega!

---

## Problem 2: Data Reset Ho Jata Hai

**Reason:** Abhi in-memory storage use ho raha hai (RAM mein data hai). Server restart = data lost.

**Solution:** MongoDB setup karein for permanent storage.

### Option A: MongoDB Atlas (Free, Cloud) - RECOMMENDED

#### 1. Account Banayein
- [MongoDB Atlas](https://cloud.mongodb.com) pe jayein
- "Try Free" click karein
- Email se sign up karein

#### 2. Cluster Create Karein
- "Build a Database" click karein
- **FREE** tier (M0) select karein
- Region: Mumbai ya Singapore (closest)
- "Create" click karein

#### 3. Database User Banayein
- Left menu → "Database Access"
- "Add New Database User"
- Username: `treeuser`
- Password: koi strong password (save kar lein!)
- "Add User"

#### 4. Network Access Allow Karein
- Left menu → "Network Access"
- "Add IP Address"
- "Allow Access from Anywhere" (0.0.0.0/0)
- "Confirm"

#### 5. Connection String Copy Karein
- "Database" → "Connect"
- "Connect your application"
- Connection string copy karein
- Example: `mongodb+srv://treeuser:<password>@cluster0.xxxxx.mongodb.net/`

#### 6. .env File Update Karein
`e:\treeViewEz\.env` file mein:
```env
MONGODB_URI=mongodb+srv://treeuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/treeview?retryWrites=true&w=majority
VITE_API_URL=http://localhost:5000/api
PORT=5000
```

**Important:** `<password>` ko apne actual password se replace karein!

#### 7. Server Restart Karein
```bash
# Purana server stop karein (Ctrl + C)
node api/server.js
```

**Success Message:**
```
✅ Connected to MongoDB
🚀 Server running on http://localhost:5000
```

---

### Option B: Local MongoDB (If you have it installed)

Agar aapke system pe MongoDB installed hai:

```env
MONGODB_URI=mongodb://localhost:27017/treeview
```

---

## Testing

### 1. Server Check
Browser mein open karein:
```
http://localhost:5000/api/health
```

Should show:
```json
{"status":"ok","message":"Server is running"}
```

### 2. Data Persistence Check
1. Tree mein kuch add/edit karein
2. Browser refresh karein
3. Data wahi rahega! ✅

---

## Quick Commands

### Start Everything (2 Terminals)

**Terminal 1 - Backend:**
```bash
cd e:\treeViewEz
node api/server.js
```

**Terminal 2 - Frontend:**
```bash
cd e:\treeViewEz
npm run dev
```

---

## Troubleshooting

### "MongoDB connection error"
- Check internet connection
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check username/password in connection string

### "Port 5000 already in use"
Change port in `.env`:
```env
PORT=3001
```

Then update `src/services/api.service.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

---

## For Vercel Deployment

Jab Vercel pe deploy karenge:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add: `MONGODB_URI` = your connection string
3. Deploy!

Data permanently MongoDB mein save hoga! 🎉
