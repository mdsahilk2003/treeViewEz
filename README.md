# Tree View Component

A fully functional, beautiful Tree View component built with React + TypeScript featuring expand/collapse, add/remove nodes, drag & drop, lazy loading, and inline editing capabilities with MongoDB persistence.

![Tree View Component](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

## ✨ Features

- 🔄 **Expand/Collapse** - Toggle node visibility with smooth animations
- ➕ **Add Nodes** - Create child nodes with inline input
- 🗑️ **Delete Nodes** - Remove nodes with confirmation dialog
- ✏️ **Inline Editing** - Double-click to edit node names
- 🎯 **Drag & Drop** - Reorder nodes with accessible drag handles
- ⚡ **Lazy Loading** - Load children asynchronously on demand
- 💾 **Auto-Save** - Automatic MongoDB persistence
- 📱 **Mobile-First** - Responsive design with touch-friendly interactions
- 🎨 **Beautiful UI** - Modern glassmorphism with smooth animations

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd treeViewEz

# Install dependencies
npm install

# Start backend server
node server-simple.js

# In another terminal, start frontend
npm run dev
```

Visit `http://localhost:5173` to see the component in action.

## 🌐 Live Demo

🔗 **[View Live Demo](#)** _(Will be updated after deployment)_

## 📖 Usage

### Basic Example

```tsx
import TreeView from './components/TreeView';
import { TreeNode } from './types';

const data: TreeNode[] = [
  {
    id: '1',
    name: 'Root Folder',
    children: [
      { id: '1-1', name: 'Child 1', children: [] },
    ],
  },
];

function App() {
  return <TreeView data={data} />;
}
```

## 🎮 How to Use

| Action | Method |
|--------|--------|
| **Expand/Collapse** | Click the chevron icon |
| **Add Child** | Click the + button |
| **Edit Name** | Double-click the node name |
| **Delete Node** | Click the trash icon |
| **Drag to Reorder** | Use the grip handle |
| **Lazy Load** | Expand nodes marked with `hasChildren: true` |

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: Express.js, Node.js
- **Database**: MongoDB (optional)
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Styling**: CSS with custom design tokens

## 📦 Project Structure

```
treeViewEz/
├── api/                    # Backend API
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Express server
├── src/                   # Frontend
│   ├── components/        # React components
│   ├── services/          # API service layer
│   └── App.tsx           # Main app
├── server-simple.js       # Standalone server (no MongoDB)
└── vercel.json           # Vercel deployment config
```

## 🌍 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production
vercel --prod
```

### Environment Variables

Add to Vercel dashboard:
- `MONGODB_URI` - Your MongoDB connection string (optional)

## 🔧 Development

```bash
# Start backend
node server-simple.js

# Start frontend
npm run dev

# Build for production
npm run build
```

## 📝 License

MIT

## 👨‍💻 Author

Built with ❤️ using React + TypeScript + MongoDB

---

⭐ Star this repo if you found it helpful!
