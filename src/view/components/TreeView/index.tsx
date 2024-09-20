import React, { useState } from 'react';
import { LocationInterface } from '../../../@shared/models/Location';
import { useApiTractian } from '../../../@shared/contexts/ApiTractianContext';
import { useTreeData } from './useTreeData';
import { ArrowDownIcon, ChevronDownIcon, ChevronRightIcon, CubeIcon, InboxIcon} from '@heroicons/react/24/outline';
import { LocationIcon } from '../../../assets/LocationIcon';
import { FlashIcon } from '../../../assets/FlashIcon';

// Tipo para representar um item na árvore
interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  sensorType?: string | null;
  type: 'location' | 'asset' | 'subasset' | 'sub-subasset';
}

const TreeNodeComponent: React.FC<{ node: TreeNode }> = ({ node }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getIcon = () => {
    if (node.children && node.children.length > 0) {
      // Nó com filhos (não é folha)
      if (node.type === 'location') {
        return <LocationIcon />;
      } else if (node.type === 'asset') {
        return <CubeIcon className="h-5 w-5 text-[#2188FF]" />;
      } else if (node.type === 'subasset') {
        return <CubeIcon className="h-5 w-5 text-[#2188FF]" />;
      } else if (node.type === 'sub-subasset') {
        return <ArrowDownIcon className="h-5 w-5 text-[#2188FF]" />;
      } 
    } else if (node.type === 'location')  {
      return <LocationIcon />
    } else {
      // Nó sem filhos (folha)
      return <InboxIcon className="h-5 w-5 text-[#2188FF]" />;
    }
  };

  return (
    <div className="ml-4 font-roboto text-[#17192D] text-sm space-y-1">
      <div className="flex items-center cursor-pointer border-b-[1px] px-1 py-1">
        {node.children && node.children.length > 0 && (
          <span onClick={handleToggle} className="mr-2 cursor-pointer flex item-center">
            {isOpen ? <ChevronDownIcon className='text-[#17192D] h-3 w-3' /> :  <ChevronRightIcon className='text-[#17192D] h-3 w-3' />}
          </span>
        )}
        {getIcon()}

        <span className='pl-1 flex items-center gap-1'>
          {node.label} 
          {node.sensorType == "energy" && <FlashIcon />}
          {node.sensorType == "vibration" && <p className='w-2 h-2 bg-[#ED3833] rounded-full'></p>}
        </span>
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

const TreeView: React.FC<{ data: LocationInterface[] }> = ({ data }) => {
  const { assets } = useApiTractian();
  const { nodes } = useTreeData(data, assets);

  return (
    <div className="tree-view">
      {nodes.map(node => (
        <TreeNodeComponent key={node.id} node={node} />
      ))}
    </div>
  );
};

export default TreeView;
