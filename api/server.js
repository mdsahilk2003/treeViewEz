require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (fallback when MongoDB is not available)
let treeData = [
    {
        id: '1',
        name: 'Root Folder',
        isExpanded: true,
        children: [
            {
                id: '1-1',
                name: 'Documents',
                isExpanded: false,
                children: [
                    { id: '1-1-1', name: 'Resume.pdf', children: [] },
                    { id: '1-1-2', name: 'Cover Letter.docx', children: [] },
                ],
            },
            {
                id: '1-2',
                name: 'Projects',
                isExpanded: false,
                hasChildren: true,
                children: [],
            },
            {
                id: '1-3',
                name: 'Images',
                isExpanded: false,
                children: [
                    { id: '1-3-1', name: 'Vacation.jpg', children: [] },
                    { id: '1-3-2', name: 'Profile.png', children: [] },
                ],
            },
        ],
    },
    {
        id: '2',
        name: 'Shared',
        isExpanded: false,
        hasChildren: true,
        children: [],
    },
];

// Routes
// Get tree data
app.get('/api/tree', (req, res) => {
    console.log('📥 GET /api/tree');
    res.json(treeData);
});

// Save tree data
app.post('/api/tree', (req, res) => {
    console.log('💾 POST /api/tree');
    const { nodes } = req.body;
    treeData = nodes;
    res.json({ success: true, tree: treeData });
});

// Lazy load children
app.get('/api/tree/node/:id/children', async (req, res) => {
    const nodeId = req.params.id;
    console.log(`⚡ GET /api/tree/node/${nodeId}/children`);

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let children = [];

    if (nodeId === '1-2') {
        children = [
            {
                id: '1-2-1',
                name: 'React App',
                children: [
                    { id: '1-2-1-1', name: 'src', children: [] },
                    { id: '1-2-1-2', name: 'public', children: [] },
                    { id: '1-2-1-3', name: 'package.json', children: [] },
                ],
            },
            {
                id: '1-2-2',
                name: 'Node.js API',
                children: [
                    { id: '1-2-2-1', name: 'routes', children: [] },
                    { id: '1-2-2-2', name: 'models', children: [] },
                    { id: '1-2-2-3', name: 'server.js', children: [] },
                ],
            },
        ];
    } else if (nodeId === '2') {
        children = [
            { id: '2-1', name: 'Team Documents', children: [] },
            { id: '2-2', name: 'Meeting Notes', children: [] },
            {
                id: '2-3',
                name: 'Resources',
                hasChildren: true,
                children: [],
            },
        ];
    } else if (nodeId === '2-3') {
        children = [
            { id: '2-3-1', name: 'Design Assets', children: [] },
            { id: '2-3-2', name: 'Code Snippets', children: [] },
        ];
    }

    res.json(children);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running (in-memory mode)' });
});

// For Vercel serverless functions
if (process.env.VERCEL) {
    module.exports = app;
} else {
    // Local development
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📝 Using in-memory storage (data will not persist on restart)`);
        console.log(`💡 To use MongoDB, add MONGODB_URI to .env file`);
    });
}
