# How to Start the Server

## The Issue
You're seeing "⚠️ Could not connect to server. Using offline mode" because the backend API server isn't running.

## Solution: Start the Backend Server

### Option 1: Manual Start (Recommended)

**Open a NEW terminal** (separate from where `npm run dev` is running) and run:

```bash
cd e:\treeViewEz
node api/server.js
```

You should see:
```
🚀 Server running on http://localhost:5000
📝 Using in-memory storage (data will not persist on restart)
💡 To use MongoDB, add MONGODB_URI to .env file
```

### Option 2: If Node command fails

Try:
```bash
cd e:\treeViewEz
npm run server
```

### Option 3: Check if port 5000 is in use

If you get a port error, try changing the port:

1. Edit `.env` file:
```
PORT=3001
```

2. Edit `src/services/api.service.ts` line 3:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

3. Restart both servers

## After Server Starts

1. Keep the server terminal running
2. In your frontend terminal, refresh the page or restart: `npm run dev`
3. The warning should disappear!
4. You'll see console logs like "✅ Tree data saved to MongoDB"

## Quick Test

Once server is running, open browser and go to:
```
http://localhost:5000/api/health
```

You should see:
```json
{"status":"ok","message":"Server is running (in-memory mode)"}
```

## For Vercel Deployment

When you deploy to Vercel, you don't need to start the server manually - Vercel handles it automatically!
