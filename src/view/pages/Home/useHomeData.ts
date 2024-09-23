import { useState, useRef } from 'react';
import { useApiTractian } from '../../../@shared/contexts/ApiTractianContext';

export function useHomeData() {
  const sensorData = [
    { time: new Date(2024, 8, 22, 0, 0), value: 10 },
    { time: new Date(2024, 8, 22, 1, 0), value: 10 },
    { time: new Date(2024, 8, 22, 2, 0), value: 10 },
    { time: new Date(2024, 8, 22, 3, 0), value: 15 },
    { time: new Date(2024, 8, 22, 4, 0), value: 15 },
    { time: new Date(2024, 8, 22, 5, 0), value: 10 },
    { time: new Date(2024, 8, 22, 6, 0), value: 20 },
  ];

  const { nodes, companySelected, assetSelected, filterAssets, filterSearchLocationOrAssets } = useApiTractian();

  const [searchTerm, setSearchTerm] = useState('');
  const previousSearchTerm = useRef(searchTerm);

  const handleSearchChange = (e: { target: { value: string } }) => {
    const value = e.target.value;

    if (value.length < previousSearchTerm.current.length) {
      filterSearchLocationOrAssets(value);
    } else {
      filterSearchLocationOrAssets(value);
    }

    setSearchTerm(value);
    previousSearchTerm.current = value;
  };

  const resetFilters = () => {
    filterAssets('clean');
    setSearchTerm('');
    filterSearchLocationOrAssets('');
  };

  return {
    sensorData,
    nodes,
    companySelected,
    assetSelected,
    searchTerm,
    handleSearchChange,
    resetFilters,
    filterAssets,
  };
}
