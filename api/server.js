const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Configuration ---
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

// Connect to MongoDB
if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('✅ Connected to MongoDB Successfully!');
            isConnected = true;
        })
        .catch((err) => {
            console.error('❌ MongoDB Connection Failed:', err.message);
            console.log('⚠️ Falling back to in-memory storage.');
        });
} else {
    console.warn('⚠️ MONGODB_URI not found in .env. Using in-memory storage.');
}

// Define Schema for Tree Data
const TreeSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true }, // Identifier for different users/sessions
    treeData: { type: Array, default: [] }, // Stores the entire tree structure
}, { timestamps: true });

const TreeModel = mongoose.model('Tree', TreeSchema);

// Default Initial Data (used if DB is empty or not connected)
let memoryTreeData = [
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

// --- Routes ---

// Get Tree Data
app.get('/api/tree', async (req, res) => {
    const userId = req.query.userId || 'default-user';
    console.log(`📥 GET /api/tree (User: ${userId})`);

    if (isConnected) {
        try {
            // Try to find data in MongoDB
            let userTree = await TreeModel.findOne({ userId });

            if (!userTree) {
                // If not found, create initial data
                console.log('✨ Creating new tree for user...');
                userTree = await TreeModel.create({
                    userId,
                    treeData: memoryTreeData
                });
            }
            return res.json(userTree.treeData);
        } catch (error) {
            console.error('Error fetching from MongoDB:', error);
            // Fallback to memory on error
            return res.json(memoryTreeData);
        }
    } else {
        // Return in-memory data if not connected
        return res.json(memoryTreeData);
    }
});

// Save Tree Data
app.post('/api/tree', async (req, res) => {
    const userId = req.query.userId || 'default-user'; // or from body
    // The frontend sends { nodes: [...] } usually
    const nodes = req.body.nodes || req.body;

    console.log(`💾 POST /api/tree (User: ${userId})`);

    if (isConnected) {
        try {
            // Update or Insert (upsert)
            const result = await TreeModel.findOneAndUpdate(
                { userId },
                { treeData: nodes },
                { upsert: true, new: true }
            );
            console.log('✅ Saved to MongoDB');
            return res.json({ success: true, tree: result.treeData });
        } catch (error) {
            console.error('Error saving to MongoDB:', error);
            return res.status(500).json({ error: 'Failed to save data' });
        }
    } else {
        // Update in-memory data
        memoryTreeData = nodes;
        console.log('⚠️ Saved to Memory (will be lost on restart)');
        return res.json({ success: true, tree: memoryTreeData });
    }
});

// Lazy Load Children (Mock Data logic preserved)
// Note: In a real app, this should also query the DB, but for now we keep the logic consistent with simple implementation
app.get('/api/tree/node/:id/children', async (req, res) => {
    const nodeId = req.params.id;
    console.log(`⚡ Lazy search for node: ${nodeId}`);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    let children = [];
    if (nodeId === '1-2') {
        children = [
            {
                id: '1-2-1', name: 'React App', children: [
                    { id: '1-2-1-1', name: 'src', children: [] },
                    { id: '1-2-1-2', name: 'public', children: [] },
                ]
            },
            {
                id: '1-2-2', name: 'Node.js API', children: [
                    { id: '1-2-2-1', name: 'routes', children: [] },
                ]
            },
        ];
    } else if (nodeId === '2') {
        children = [
            { id: '2-1', name: 'Team Docs', children: [] },
            { id: '2-2', name: 'Meeting Notes', children: [] },
        ];
    }

    res.json(children);
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        mongoConnected: isConnected,
        environment: process.env.NODE_ENV || 'development'
    });
});

// Start Server
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        if (!isConnected && !MONGODB_URI) {
            console.log(`👉 Add MONGODB_URI to .env to enable permanent storage`);
        }
    });
}

// Export for Vercel
module.exports = app;
