import { useState, useEffect } from 'react';
import { LocationInterface } from '../../../@shared/models/Location';
import { Asset } from '../../../@shared/models/Asset';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  type: 'location' | 'asset' | 'subasset' | 'sub-subasset';
}

export const useTreeData = (locations: LocationInterface[], assets: Asset[]) => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  useEffect(() => {
    const buildCombinedTree = (locations: LocationInterface[], assets: Asset[]): TreeNode[] => {
      const locationMap = new Map<string, TreeNode>();
      const assetMap = new Map<string, TreeNode>();
      const roots: TreeNode[] = [];

      // Cria um nó para cada localização
      locations.forEach(location => {
        locationMap.set(location.id, { id: location.id, label: location.name, type: 'location', children: [] });
      });

      // Define as relações pai-filho nas localizações
      locations.forEach(location => {
        const treeNode = locationMap.get(location.id);
        if (location.parentId) {
          const parent = locationMap.get(location.parentId);
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(treeNode!);
          }
        } else {
          roots.push(treeNode!);
        }
      });

      // Cria um nó para cada asset
      assets.forEach(asset => {
        const assetType = asset.parentId 
          ? (assetMap.has(asset.parentId) && assetMap.get(asset.parentId)?.type === 'subasset' 
             ? 'sub-subasset' 
             : 'subasset') 
          : 'asset';

        assetMap.set(asset.id, { id: asset.id, label: asset.name, type: assetType, children: [] });
      });

      // Define as relações de sub-assets e componentes nos assets
      assets.forEach(asset => {
        const treeNode = assetMap.get(asset.id);
        if (asset.parentId) {
          const parent = assetMap.get(asset.parentId);  // Sub-assets de outros assets
          if (parent) {
            parent.children = parent.children || [];
            parent.children.push(treeNode!);
          }
        } else if (asset.locationId) {
          const locationNode = locationMap.get(asset.locationId);  // Asset dentro de localização
          if (locationNode) {
            locationNode.children = locationNode.children || [];
            locationNode.children.push(treeNode!);
          }
        } else {
          roots.push(treeNode!);
        }
      });

      // Atualiza os tipos para garantir que os ativos sem filhos são corretamente identificados
      const updateTypes = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
          node.children.forEach(child => updateTypes(child));
        } else if (node.type === 'subasset' && assetMap.has(node.id)) {
          node.type = 'sub-subasset';
        }
      };

      roots.forEach(root => updateTypes(root));

      return roots;
    };

    const combinedTree = buildCombinedTree(locations, assets);
    setNodes(combinedTree);
  }, [locations, assets]);

  return { nodes };
};
