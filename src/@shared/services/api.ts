// @shared/services/api.ts
import axios from 'axios';
import { Company } from '../models/Company';
import { Asset } from '../models/Asset';


const api = axios.create({
  baseURL: 'https://fake-api.tractian.com',
});

// Função para pegar todas as empresas
export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get<Company[]>('/companies');
  return response.data;
};

// Função para pegar locais de uma empresa específica
export const getCompanyLocations = async (companyId: number): Promise<Location[]> => {
  const response = await api.get<Location[]>(`/companies/${companyId}/locations`);
  return response.data;
};

// Função para pegar os ativos de uma empresa específica
export const getCompanyAssets = async (companyId: number): Promise<Asset[]> => {
  const response = await api.get<Asset[]>(`/companies/${companyId}/assets`);
  return response.data;
};
