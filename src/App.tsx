import React, { useState, useEffect } from 'react';
import TreeView from './components/TreeView';
import { TreeNode } from './types';
import { FolderTree, Loader2 } from 'lucide-react';
import { treeApi } from './services/api.service';
import './App.css';

function App() {
    const [treeData, setTreeData] = useState<TreeNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load data from API on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const data = await treeApi.getTree();
                setTreeData(data);
                setError(null);
            } catch (err) {
                console.error('Failed to load tree data:', err);
                setError('⚠️ Could not connect to server. Using offline mode.');
                // Fallback data
                setTreeData([
                    {
                        id: '1',
                        name: 'Root Folder',
                        isExpanded: true,
                        children: [
                            {
                                id: '1-1',
                                name: 'Documents',
                                children: [
                                    { id: '1-1-1', name: 'Resume.pdf', children: [] },
                                ],
                            },
                        ],
                    },
                ]);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Auto-save when data changes
    const handleDataChange = async (newData: TreeNode[]) => {
        setTreeData(newData);

        try {
            await treeApi.saveTree(newData);
            console.log('✅ Tree data saved to MongoDB');
        } catch (err) {
            console.error('❌ Failed to save tree data:', err);
        }
    };

    // Lazy load children from API
    const handleLazyLoad = async (nodeId: string): Promise<TreeNode[]> => {
        try {
            return await treeApi.loadChildren(nodeId);
        } catch (err) {
            console.error('Failed to load children:', err);
            return [];
        }
    };

    if (loading) {
        return (
            <div className="app">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <Loader2 size={48} className="spinner" style={{ color: '#6366f1' }} />
                    <p style={{ color: '#9ca3af' }}>Loading tree data from MongoDB...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app">
            <header className="app-header">
                <div className="app-header-content">
                    <div className="app-logo">
                        <FolderTree size={32} />
                    </div>
                    <div className="app-title">
                        <h1>
                            Tree View <span className="gradient-text">Component</span>
                        </h1>
                        <p>With MongoDB persistence and auto-save</p>
                    </div>
                </div>
            </header>

            <main className="app-main">
                {error && (
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto 1rem',
                        padding: '1rem',
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: '0.5rem',
                        color: '#f59e0b',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <div className="app-features">
                    <div className="feature-card">
                        <h3>✨ Features</h3>
                        <ul>
                            <li>🔄 Expand/Collapse nodes</li>
                            <li>➕ Add child nodes</li>
                            <li>🗑️ Delete nodes with confirmation</li>
                            <li>✏️ Inline editing (double-click)</li>
                            <li>🎯 Drag & drop reordering</li>
                            <li>⚡ Lazy loading from API</li>
                            <li>💾 Auto-save to MongoDB</li>
                            <li>📱 Mobile-first responsive</li>
                        </ul>
                    </div>
                    <div className="feature-card">
                        <h3>🎮 How to Use</h3>
                        <ul>
                            <li><strong>Expand:</strong> Click chevron icon</li>
                            <li><strong>Add:</strong> Click + button</li>
                            <li><strong>Edit:</strong> Double-click node name</li>
                            <li><strong>Delete:</strong> Click trash icon</li>
                            <li><strong>Drag:</strong> Use grip handle to reorder</li>
                            <li><strong>Lazy Load:</strong> Expand "Projects" or "Shared"</li>
                        </ul>
                    </div>
                </div>

                <TreeView
                    data={treeData}
                    onDataChange={handleDataChange}
                    onLazyLoad={handleLazyLoad}
                />
            </main>

            <footer className="app-footer">
                <p>Built with React + TypeScript + MongoDB + Express</p>
            </footer>
        </div>
    );
}

export default App;
