const express = require('express');
const Tree = require('../models/tree.model');

const router = express.Router();

// Get tree data
router.get('/tree', async (req, res) => {
    try {
        const userId = req.query.userId || 'default';
        let tree = await Tree.findOne({ userId });

        if (!tree) {
            // Create default tree if none exists
            tree = await Tree.create({
                userId,
                nodes: [
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
                ],
            });
        }

        res.json(tree.nodes);
    } catch (error) {
        console.error('Error fetching tree:', error);
        res.status(500).json({ error: 'Failed to fetch tree data' });
    }
});

// Save tree data
router.post('/tree', async (req, res) => {
    try {
        const userId = req.body.userId || 'default';
        const nodes = req.body.nodes;

        let tree = await Tree.findOne({ userId });

        if (tree) {
            tree.nodes = nodes;
            await tree.save();
        } else {
            tree = await Tree.create({ userId, nodes });
        }

        res.json({ success: true, tree: tree.nodes });
    } catch (error) {
        console.error('Error saving tree:', error);
        res.status(500).json({ error: 'Failed to save tree data' });
    }
});

// Lazy load children for a specific node
router.get('/tree/node/:id/children', async (req, res) => {
    try {
        const nodeId = req.params.id;

        // Simulate lazy loading with mock data
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
    } catch (error) {
        console.error('Error loading children:', error);
        res.status(500).json({ error: 'Failed to load children' });
    }
});

module.exports = router;
