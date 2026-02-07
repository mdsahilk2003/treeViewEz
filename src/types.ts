export interface TreeNode {
    id: string;
    name: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    isLoading?: boolean;
    hasChildren?: boolean; // For lazy loading - indicates children exist but aren't loaded yet
}

export interface TreeViewProps {
    data: TreeNode[];
    onDataChange?: (data: TreeNode[]) => void;
    onLazyLoad?: (nodeId: string) => Promise<TreeNode[]>;
}

export interface TreeNodeProps {
    node: TreeNode;
    level: number;
    onToggle: (nodeId: string) => void;
    onAdd: (parentId: string, name: string) => void;
    onDelete: (nodeId: string) => void;
    onEdit: (nodeId: string, newName: string) => void;
    onLazyLoad?: (nodeId: string) => Promise<TreeNode[]>;
}

export interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}
