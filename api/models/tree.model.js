const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    children: [this],
    isExpanded: {
        type: Boolean,
        default: false,
    },
    hasChildren: {
        type: Boolean,
        default: false,
    },
}, { _id: false });

// Self-reference for recursive structure
nodeSchema.add({ children: [nodeSchema] });

const treeSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: 'default',
        index: true,
    },
    nodes: [nodeSchema],
}, {
    timestamps: true,
});

const Tree = mongoose.model('Tree', treeSchema);

module.exports = Tree;
