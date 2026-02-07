# 🚀 GitHub & Vercel Deployment Guide

## Step 1: GitHub Repository Setup

### Option A: Using GitHub CLI (Recommended)

```bash
# Install GitHub CLI if not installed
# Download from: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository and push
gh repo create treeViewEz --public --source=. --remote=origin --push
```

### Option B: Manual GitHub Setup

1. **GitHub pe jayein**: https://github.com/new
2. **Repository details**:
   - Repository name: `treeViewEz`
   - Description: `Tree View Component with MongoDB`
   - Public
   - **DON'T** initialize with README (already hai)
3. **Create repository** click karein
4. **Commands run karein**:

```bash
cd e:\treeViewEz

# Remote add karein (apna username dalein)
git remote add origin https://github.com/YOUR_USERNAME/treeViewEz.git

# Branch rename (if needed)
git branch -M main

# Push karein
git push -u origin main
```

---

## Step 2: Vercel Deployment

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy Karein

```bash
cd e:\treeViewEz

# Vercel login
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name? treeViewEz
# - Directory? ./
# - Override settings? No

# Production deployment
vercel --prod
```

---

## Step 3: Environment Variables (Optional - For MongoDB)

### Agar MongoDB use karna hai:

1. **Vercel Dashboard** pe jayein: https://vercel.com/dashboard
2. **Your project** select karein
3. **Settings** → **Environment Variables**
4. **Add**:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster.mongodb.net/treeview`
   - Environment: Production, Preview, Development
5. **Save**
6. **Redeploy**:
   ```bash
   vercel --prod
   ```

---

## Step 4: Verification

### Check Deployment

1. Vercel deployment complete hone ke baad URL milega
2. Example: `https://tree-view-ez.vercel.app`
3. Browser mein open karein
4. Test karein:
   - ✅ Tree loads
   - ✅ Add/Edit/Delete works
   - ✅ Drag & drop works
   - ✅ Mobile responsive

---

## Quick Commands Summary

```bash
# Git setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/treeViewEz.git
git push -u origin main

# Vercel deployment
npm install -g vercel
vercel login
vercel --prod
```

---

## Troubleshooting

### "Git not found"
Install Git: https://git-scm.com/download/win

### "Vercel command not found"
```bash
npm install -g vercel
```

### Build fails on Vercel
Check build logs in Vercel dashboard

### MongoDB connection error
Add `MONGODB_URI` in Vercel environment variables

---

## 🎉 Success!

Aapka Tree View component ab live hai!

**Share karein**:
- GitHub: `https://github.com/YOUR_USERNAME/treeViewEz`
- Live Demo: `https://your-project.vercel.app`

---

## Next Steps

1. ✅ GitHub repository created
2. ✅ Code pushed
3. ✅ Deployed on Vercel
4. ⭐ Star your own repo!
5. 📱 Share the live link!
