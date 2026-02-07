# Tree View with MongoDB - Deployment Guide

## 🚀 Quick Setup

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free account (if you don't have one)
3. Create a new cluster (free tier M0 is fine)
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 2. Local Development

```bash
# 1. Create .env file
cp .env.example .env

# 2. Edit .env and add your MongoDB connection string
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/treeview

# 3. Install dependencies (already done)
npm install

# 4. Start backend server (in one terminal)
node api/server.js

# 5. Start frontend (in another terminal)
npm run dev
```

### 3. Deploy to Vercel

```bash
# 1. Install Vercel CLI (if not installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy
vercel

# 4. Add environment variable in Vercel Dashboard
# Go to: Project Settings → Environment Variables
# Add: MONGODB_URI = your_mongodb_connection_string

# 5. Redeploy
vercel --prod
```

## 📝 Environment Variables

### Local (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/treeview
VITE_API_URL=http://localhost:5000/api
PORT=5000
```

### Vercel Dashboard
Add this environment variable:
- **Key**: `MONGODB_URI`
- **Value**: Your MongoDB Atlas connection string
- **Environment**: Production, Preview, Development

## 🔧 Project Structure

```
e:/treeViewEz/
├── api/
│   ├── models/
│   │   └── tree.model.js       # Mongoose schema
│   ├── routes/
│   │   └── tree.routes.js      # API endpoints
│   └── server.js               # Express server
├── src/
│   ├── components/             # React components
│   ├── services/
│   │   └── api.service.ts      # API integration
│   └── App.tsx                 # Main app with MongoDB
├── vercel.json                 # Vercel config
└── .env.example                # Environment template
```

## 🌐 API Endpoints

- `GET /api/tree` - Get all tree data
- `POST /api/tree` - Save tree data
- `GET /api/tree/node/:id/children` - Lazy load children

## ✅ Features

- ✅ MongoDB persistence
- ✅ Auto-save on every change
- ✅ Lazy loading from API
- ✅ Offline fallback mode
- ✅ Loading states
- ✅ Error handling
- ✅ Vercel deployment ready

## 🐛 Troubleshooting

### "Could not connect to server"
- Make sure backend is running: `node api/server.js`
- Check MongoDB connection string in `.env`
- Verify MongoDB Atlas allows connections from your IP

### Vercel Deployment Issues
- Ensure `MONGODB_URI` is set in Vercel dashboard
- Check build logs in Vercel dashboard
- Verify `vercel.json` configuration

## 📚 Next Steps

1. Set up MongoDB Atlas account
2. Add connection string to `.env`
3. Test locally
4. Deploy to Vercel
5. Share your live URL!
