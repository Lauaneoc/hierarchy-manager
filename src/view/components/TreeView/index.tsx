import React, { useState } from 'react';

// Tipo para representar um item na árvore
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

// Props para o componente TreeView
interface TreeViewProps {
  data: TreeNode[];
}

// Componente TreeNode
const TreeNodeComponent: React.FC<{ node: TreeNode }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer">
        {node.children && (
          <span
            onClick={handleToggle}
            className={`mr-2 ${node.children.length > 0 ? 'cursor-pointer' : ''}`}
          >
            {isOpen ? '[-]' : '[+]'}
          </span>
        )}
        <span>{node.label}</span>
      </div>
      {isOpen && node.children && (
        <div className="ml-4">
          {node.children.map(child => (
            <TreeNodeComponent key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

// Componente TreeView
const TreeView: React.FC<TreeViewProps> = ({ data }) => {
  return (
    <div className="tree-view">
      {data.map(node => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
