import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
    ChevronRight,
    ChevronDown,
    Plus,
    Trash2,
    GripVertical,
    Loader2,
    Edit2,
    Check,
    X
} from 'lucide-react';
import { TreeNodeProps } from '../types';
import ConfirmDialog from './ConfirmDialog';
import './TreeNode.css';

const TreeNode: React.FC<TreeNodeProps> = ({
    node,
    level,
    onToggle,
    onAdd,
    onDelete,
    onEdit,
    onLazyLoad,
}) => {
    const [showAddInput, setShowAddInput] = useState(false);
    const [newNodeName, setNewNodeName] = useState('');
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(node.name);
    const inputRef = useRef<HTMLInputElement>(null);
    const editInputRef = useRef<HTMLInputElement>(null);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: node.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    useEffect(() => {
        if (showAddInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showAddInput]);

    useEffect(() => {
        if (isEditing && editInputRef.current) {
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    }, [isEditing]);

    const hasChildren = (node.children && node.children.length > 0) || node.hasChildren;

    const handleToggle = async () => {
        if (node.hasChildren && !node.children && onLazyLoad) {
            // Trigger lazy loading
            await onLazyLoad(node.id);
        }
        onToggle(node.id);
    };

    const handleAddNode = () => {
        if (newNodeName.trim()) {
            onAdd(node.id, newNodeName.trim());
            setNewNodeName('');
            setShowAddInput(false);
        }
    };

    const handleDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        onDelete(node.id);
        setShowDeleteDialog(false);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditValue(node.name);
    };

    const handleEditSave = () => {
        if (editValue.trim() && editValue !== node.name) {
            onEdit(node.id, editValue.trim());
        }
        setIsEditing(false);
    };

    const handleEditCancel = () => {
        setEditValue(node.name);
        setIsEditing(false);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleEditSave();
        } else if (e.key === 'Escape') {
            handleEditCancel();
        }
    };

    const handleAddKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddNode();
        } else if (e.key === 'Escape') {
            setShowAddInput(false);
            setNewNodeName('');
        }
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className={`tree-node ${isDragging ? 'dragging' : ''}`}
            >
                <div className="tree-node-content" style={{ paddingLeft: `${level * 24}px` }}>
                    {/* Drag Handle */}
                    <button
                        className="tree-node-drag-handle"
                        {...attributes}
                        {...listeners}
                        aria-label="Drag to reorder"
                    >
                        <GripVertical size={16} />
                    </button>

                    {/* Expand/Collapse Button */}
                    {hasChildren ? (
                        <button
                            className="tree-node-toggle"
                            onClick={handleToggle}
                            aria-label={node.isExpanded ? 'Collapse' : 'Expand'}
                        >
                            {node.isLoading ? (
                                <Loader2 size={16} className="spinner" />
                            ) : node.isExpanded ? (
                                <ChevronDown size={16} />
                            ) : (
                                <ChevronRight size={16} />
                            )}
                        </button>
                    ) : (
                        <span className="tree-node-spacer" />
                    )}

                    {/* Node Name */}
                    {isEditing ? (
                        <div className="tree-node-edit">
                            <input
                                ref={editInputRef}
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                onKeyDown={handleEditKeyDown}
                                onBlur={handleEditSave}
                                className="tree-node-edit-input"
                            />
                            <button
                                className="tree-node-action-btn success"
                                onClick={handleEditSave}
                                aria-label="Save"
                            >
                                <Check size={14} />
                            </button>
                            <button
                                className="tree-node-action-btn danger"
                                onClick={handleEditCancel}
                                aria-label="Cancel"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <span
                            className="tree-node-name"
                            onDoubleClick={handleDoubleClick}
                            title="Double-click to edit"
                        >
                            {node.name}
                        </span>
                    )}

                    {/* Action Buttons */}
                    <div className="tree-node-actions">
                        <button
                            className="tree-node-action-btn"
                            onClick={handleDoubleClick}
                            aria-label="Edit node"
                            title="Edit"
                        >
                            <Edit2 size={14} />
                        </button>
                        <button
                            className="tree-node-action-btn"
                            onClick={() => setShowAddInput(true)}
                            aria-label="Add child node"
                            title="Add child"
                        >
                            <Plus size={14} />
                        </button>
                        <button
                            className="tree-node-action-btn danger"
                            onClick={handleDeleteClick}
                            aria-label="Delete node"
                            title="Delete"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                </div>

                {/* Add Node Input */}
                {showAddInput && (
                    <div className="tree-node-add" style={{ paddingLeft: `${(level + 1) * 24}px` }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={newNodeName}
                            onChange={(e) => setNewNodeName(e.target.value)}
                            onKeyDown={handleAddKeyDown}
                            placeholder="Enter node name..."
                            className="tree-node-add-input"
                        />
                        <button
                            className="tree-node-action-btn success"
                            onClick={handleAddNode}
                            aria-label="Confirm add"
                        >
                            <Check size={14} />
                        </button>
                        <button
                            className="tree-node-action-btn danger"
                            onClick={() => {
                                setShowAddInput(false);
                                setNewNodeName('');
                            }}
                            aria-label="Cancel add"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Render Children */}
            {node.isExpanded && node.children && (
                <div className="tree-node-children">
                    {node.children.map((child) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            level={level + 1}
                            onToggle={onToggle}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onLazyLoad={onLazyLoad}
                        />
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showDeleteDialog}
                title="Delete Node"
                message={`Are you sure you want to delete "${node.name}" and all its children? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowDeleteDialog(false)}
            />
        </>
    );
};

export default TreeNode;
