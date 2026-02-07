import { TreeNode } from '../types';

const API_URL = '/api';

export const treeApi = {
    // Get all tree data
    async getTree(userId: string = 'default'): Promise<TreeNode[]> {
        try {
            const response = await fetch(`${API_URL}/tree?userId=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch tree data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching tree:', error);
            throw error;
        }
    },

    // Save tree data
    async saveTree(nodes: TreeNode[], userId: string = 'default'): Promise<void> {
        try {
            const response = await fetch(`${API_URL}/tree`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, nodes }),
            });

            if (!response.ok) {
                throw new Error('Failed to save tree data');
            }
        } catch (error) {
            console.error('Error saving tree:', error);
            throw error;
        }
    },

    // Lazy load children for a node
    async loadChildren(nodeId: string): Promise<TreeNode[]> {
        try {
            const response = await fetch(`${API_URL}/tree/node/${nodeId}/children`);
            if (!response.ok) {
                throw new Error('Failed to load children');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading children:', error);
            throw error;
        }
    },
};
