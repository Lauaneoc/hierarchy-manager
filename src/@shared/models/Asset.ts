export interface Asset {
    id: string;          
    locationId: string; 
    name: string;        
    parentId: string | null; 
    sensorType: string | null;
    status: string | null; 
}
