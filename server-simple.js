const express = require('express');

const app = express();
app.use(express.json());

// In-memory storage
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

// Get tree
app.get('/api/tree', (req, res) => {
    console.log('📥 GET /api/tree');
    res.json(treeData);
});

// Save tree
app.post('/api/tree', (req, res) => {
    console.log('💾 POST /api/tree');
    treeData = req.body.nodes || req.body;
    res.json({ success: true, tree: treeData });
});

// Lazy load
app.get('/api/tree/node/:id/children', async (req, res) => {
    const nodeId = req.params.id;
    console.log(`⚡ Lazy load: ${nodeId}`);

    await new Promise(resolve => setTimeout(resolve, 1000));

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
            { id: '2-1', name: 'Team Documents', children: [] },
            { id: '2-2', name: 'Meeting Notes', children: [] },
        ];
    }

    res.json(children);
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 API Server: http://localhost:${PORT}`);
});
