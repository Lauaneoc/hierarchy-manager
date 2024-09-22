export interface Asset {
    id: string;          
    locationId: string; 
    name: string;        
    parentId: string | null; 
    sensorType: string | null;
    sensorId: string;
    status: string | null; 
    gatewayId: string | null; 
}
