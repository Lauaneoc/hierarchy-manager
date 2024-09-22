export interface TreeNode {
    id: string;
    label: string;
    children?: TreeNode[];
    sensorType?: string | null;
    type: 'location' | 'asset' | 'subasset' | 'sub-subasset';
    status?: string | null;
    parentId?: string | null;
    locationId?: string | null;
    sensorId?: string | null;
    gatewayId?: string | null;
  }