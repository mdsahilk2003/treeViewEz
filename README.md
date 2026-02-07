# Tree View Component

A fully functional, beautiful Tree View component built with React + TypeScript featuring expand/collapse, add/remove nodes, drag & drop, lazy loading, and inline editing capabilities.

![Tree View Component](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite)

## ✨ Features

- 🔄 **Expand/Collapse** - Toggle node visibility with smooth animations
- ➕ **Add Nodes** - Create child nodes with inline input
- 🗑️ **Delete Nodes** - Remove nodes with confirmation dialog
- ✏️ **Inline Editing** - Double-click to edit node names
- 🎯 **Drag & Drop** - Reorder nodes with accessible drag handles
- ⚡ **Lazy Loading** - Load children asynchronously on demand
- 📱 **Mobile-First** - Responsive design with touch-friendly interactions
- 🎨 **Beautiful UI** - Modern glassmorphism with smooth animations

## 🚀 Quick Start

### Installation

```bash
# Clone or navigate to the project
cd e:\treeViewEz

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the component in action.

### Build for Production

```bash
npm run build
npm run preview
```

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
      { id: '1-2', name: 'Child 2', children: [] },
    ],
  },
];

function App() {
  return <TreeView data={data} />;
}
```

### With All Features

```tsx
import { useState } from 'react';
import TreeView from './components/TreeView';
import { TreeNode } from './types';

function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>(initialData);

  const handleLazyLoad = async (nodeId: string): Promise<TreeNode[]> => {
    // Fetch children from API
    const response = await fetch(`/api/nodes/${nodeId}/children`);
    return response.json();
  };

  return (
    <TreeView
      data={treeData}
      onDataChange={setTreeData}
      onLazyLoad={handleLazyLoad}
    />
  );
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

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TreeView.tsx          # Main container component
│   ├── TreeView.css          # Container styles
│   ├── TreeNode.tsx          # Individual node component
│   ├── TreeNode.css          # Node styles
│   ├── ConfirmDialog.tsx     # Confirmation modal
│   └── ConfirmDialog.css     # Modal styles
├── types.ts                  # TypeScript interfaces
├── App.tsx                   # Demo application
├── App.css                   # App styles
├── main.tsx                  # Entry point
└── index.css                 # Global styles
```

## 🎨 Design System

### Color Palette
- **Background**: Dark gradient (`#0a0e1a` → `#1a1f35`)
- **Accent**: Indigo/Purple (`#6366f1` → `#8b5cf6`)
- **Success**: Green (`#10b981`)
- **Danger**: Red (`#ef4444`)

### Typography
- **Font**: Inter (Google Fonts)
- **Responsive**: 13px → 16px based on screen size

### Effects
- **Glassmorphism**: Backdrop blur with semi-transparent backgrounds
- **Animations**: Smooth transitions on all interactions
- **Shadows**: Layered depth with glow effects

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering
- `typescript` - Type safety

### Drag & Drop
- `@dnd-kit/core` - Drag & drop core
- `@dnd-kit/sortable` - Sortable utilities
- `@dnd-kit/utilities` - Helper functions

### UI
- `lucide-react` - Icon library

### Build Tools
- `vite` - Fast build tool
- `@vitejs/plugin-react` - React plugin

## 🔧 API Reference

### TreeNode Interface

```typescript
interface TreeNode {
  id: string;              // Unique identifier
  name: string;            // Display name
  children?: TreeNode[];   // Nested children
  isExpanded?: boolean;    // Expansion state
  isLoading?: boolean;     // Loading indicator
  hasChildren?: boolean;   // Lazy load flag
}
```

### TreeView Props

```typescript
interface TreeViewProps {
  data: TreeNode[];                              // Tree data
  onDataChange?: (data: TreeNode[]) => void;     // Data change callback
  onLazyLoad?: (nodeId: string) => Promise<TreeNode[]>; // Lazy load handler
}
```

## 🎯 Features in Detail

### Expand/Collapse
- Click chevron icon to toggle
- Smooth rotation animation
- Maintains state across interactions

### Add Node
- Inline input with keyboard support
- Enter to confirm, Escape to cancel
- Auto-expands parent node

### Delete Node
- Confirmation dialog before deletion
- Deletes entire subtree
- Glassmorphism modal overlay

### Inline Editing
- Double-click to activate
- Save with Enter or check button
- Cancel with Escape or X button

### Drag & Drop
- Accessible with keyboard support
- Visual feedback during drag
- Touch-friendly for mobile

### Lazy Loading
- Async children loading
- Loading spinner animation
- Error handling included

## 📱 Responsive Design

- **Mobile**: 320px+ (compact spacing, visible actions)
- **Tablet**: 768px+ (medium spacing)
- **Desktop**: 1024px+ (full spacing, hover actions)

## 🚀 Performance

- **Recursive Rendering**: Efficient component reuse
- **Immutable Updates**: Predictable state changes
- **CSS Animations**: Hardware-accelerated transitions
- **Lazy Loading**: Load data only when needed

## 🎨 Customization

All styles use CSS variables for easy theming:

```css
:root {
  --color-accent-primary: #6366f1;
  --color-bg-primary: #0a0e1a;
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
  /* ... and more */
}
```

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! This is a demo project showcasing modern React patterns.

## 💡 Future Enhancements

- [ ] Advanced drag & drop (cross-parent moves)
- [ ] Search and filter functionality
- [ ] Keyboard navigation (arrow keys)
- [ ] Context menu (right-click)
- [ ] Virtualization for large trees
- [ ] Undo/Redo support
- [ ] Export/Import JSON

---

Built with ❤️ using React + TypeScript + Vite
