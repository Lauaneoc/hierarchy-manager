// src/context/ApiTractianContext.tsx
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { getCompanies, getCompanyLocations, getCompanyAssets } from '../services/apiTractian';
import { Company } from '../models/Company';
import { LocationInterface } from '../models/Location';
import { Asset } from '../models/Asset';
import { TreeNode } from '../models/TreeNode';

interface ApiTractianContextType {
  companies: Company[];
  companySelected: string;
  assetSelected: TreeNode;
  setCompanySelected: (companyId: string) => void; 
  setAssetSelected: (node: TreeNode) => void; 
  locations: LocationInterface[];
  assets: Asset[] ;
  assetsFiltered: Asset[] ;
  fetchCompanies: () => void;
  locationsFiltered: LocationInterface[]
  fetchCompanyLocations: (companyId: string) => void;
  fetchCompanyAssets: (companyId: string) => void;
  filterAssets: (name: string) => void;
  filterSearchLocationOrAssets: (search: string) => void;
  nodes: TreeNode[];
}

const defaultApiTractianContext: ApiTractianContextType = {
  companies: [],
  locations: [],
  assets: [],
  locationsFiltered: [],
  assetsFiltered: [],
  fetchCompanies: () => {},
  fetchCompanyLocations: () => {},
  fetchCompanyAssets: () => {},
  setCompanySelected: () => {},
  setAssetSelected: () => {},
  filterAssets: () => {},
  filterSearchLocationOrAssets: () => {},
  companySelected: "",
  nodes: [],
  assetSelected: {id: "", label: '', type: "asset", children: [], sensorType: ""}
};

const ApiTractianContext = createContext<ApiTractianContextType>(defaultApiTractianContext);

interface ApiProviderProps {
  children: ReactNode;
}

export function ApiProviderTractian({ children }: ApiProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companySelected, setCompanySelected] = useState("")
  const [assetSelected, setAssetSelected] = useState<TreeNode>({id: "", label: '', type: "asset", children: [], sensorType: ""})
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const [locationsFiltered, setLocationsFiltered] = useState<LocationInterface[]>(locations);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [assetsFiltered, setAssetsFiltered] = useState<Asset[]>(assets);
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [nodeFiltered, setNodesFiltered] = useState<TreeNode[]>([]);


  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
    }
  };

  // Função para buscar locais de uma empresa específica
  const fetchCompanyLocations = async (companyId: string) => {
    try {
      const data = await getCompanyLocations(companyId);
      fetchCompanyAssets(companyId);
      setLocationsFiltered(data);
      setLocations(data);
    } catch (error) {
      console.error('Erro ao buscar locais da empresa:', error);
    }
  };

  const filterAssets = async (name: string) => {
    try {
      if(name == "clean") {
        setAssetsFiltered(assets) 
      } else {
        const data = assets.filter(item => item.sensorType != `${name}`)
        setAssetsFiltered(data)
      }
    } catch (error) {
      console.error('Erro ao buscar locais da empresa:', error);
    }
  };

  const filterSearchLocationOrAssets = (search: string) => {
    const filterTree = (node: TreeNode): TreeNode | null => {
        const isMatch = node.label.toLowerCase().includes(search.toLowerCase());

        if (node.children) {
            const filteredChildren = node.children
                .map(filterTree)
                .filter((child) => child !== null) as TreeNode[];

            if (isMatch || filteredChildren.length > 0) {
                return { ...node, children: filteredChildren };
            }
        } else if (isMatch) {
            return node;
        }

        return null;
    };

    // Se a busca estiver vazia, reinicia os nós
    if (search.trim() === "") {
        setNodes(nodeFiltered);
        return;
    }

    const filteredNodes = nodeFiltered
        .map(filterTree)
        .filter((node) => node !== null) as TreeNode[];

    setNodes(filteredNodes);
};

  
  // Função para buscar os ativos de uma empresa específica
  const fetchCompanyAssets = async (companyId: string) => {
    try {
      const data = await getCompanyAssets(companyId);
      setAssets(data);
      setAssetsFiltered(data)
    } catch (error) {
      console.error('Erro ao buscar ativos da empresa:', error);
    }
  };

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

      assetMap.set(asset.id, { id: asset.id, label: asset.name, sensorType: asset.sensorType, gatewayId: asset.gatewayId,  type: assetType, locationId: asset.locationId, parentId
        : asset.parentId, status: asset.status, sensorId: asset.sensorId, children: [] });
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
        node.children.map(child => updateTypes(child));
      } else if (node.type === 'subasset' && assetMap.has(node.id)) {
        node.type = 'sub-subasset';
      }
    };

    roots.map(root => updateTypes(root));

    return roots;
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchCompanies();
    const combinedTree = buildCombinedTree(locationsFiltered, assetsFiltered);
    setNodes(combinedTree);
    setNodesFiltered(combinedTree)
  }, [locationsFiltered, assetsFiltered]);

  return (
    <ApiTractianContext.Provider
      value={{ nodes, companies, locationsFiltered, assetSelected, assetsFiltered, filterSearchLocationOrAssets, filterAssets, setAssetSelected,companySelected, setCompanySelected, locations, assets, fetchCompanies, fetchCompanyLocations, fetchCompanyAssets }}
    >
      {children}
    </ApiTractianContext.Provider>
  );
}

// Hook para usar o contexto em outros componentes
export function useApiTractian() {
  return useContext(ApiTractianContext);
}
