// src/context/ApiTractianContext.tsx
import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { getCompanies, getCompanyLocations, getCompanyAssets } from '../services/apiTractian';
import { Company } from '../models/Company';
import { LocationInterface } from '../models/Location';
import { Asset } from '../models/Asset';

interface ApiTractianContextType {
  companies: Company[];
  locations: LocationInterface[];
  assets: Asset[] ;
  fetchCompanies: () => void;
  fetchCompanyLocations: (companyId: string) => void;
  fetchCompanyAssets: (companyId: string) => void;
}

const defaultApiTractianContext: ApiTractianContextType = {
  companies: [],
  locations: [],
  assets: [],
  fetchCompanies: () => {},
  fetchCompanyLocations: () => {},
  fetchCompanyAssets: () => {},
};

const ApiTractianContext = createContext<ApiTractianContextType>(defaultApiTractianContext);

interface ApiProviderProps {
  children: ReactNode;
}

export function ApiProviderTractian({ children }: ApiProviderProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

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
      setLocations(data);
    } catch (error) {
      console.error('Erro ao buscar locais da empresa:', error);
    }
  };
  

  // Função para buscar os ativos de uma empresa específica
  const fetchCompanyAssets = async (companyId: string) => {
    try {
      const data = await getCompanyAssets(companyId);
      setAssets(data);
    } catch (error) {
      console.error('Erro ao buscar ativos da empresa:', error);
    }
  };

  // Carregar dados iniciais
  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <ApiTractianContext.Provider
      value={{ companies, locations, assets, fetchCompanies, fetchCompanyLocations, fetchCompanyAssets }}
    >
      {children}
    </ApiTractianContext.Provider>
  );
}

// Hook para usar o contexto em outros componentes
export function useApiTractian() {
  return useContext(ApiTractianContext);
}
