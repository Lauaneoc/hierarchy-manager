import { useApiTractian } from "../../../@shared/contexts/ApiTractianContext";
import { TreeView } from "../../components";
import imagemTeste from '../../../assets/imagemTeste.png';
import filterResetIcon from '../../../assets/FilterReset.svg';
import { Button } from "../../components/Button";
import { AssetDetails } from "../../components/AssetsDetails";
import { useState, useRef } from 'react';

export function Home() {
    const { nodes, companySelected, assetSelected, filterAssets, filterSearchLocationOrAssets } = useApiTractian();

    const [searchTerm, setSearchTerm] = useState('');
    const previousSearchTerm = useRef(searchTerm); // Armazena o valor anterior da busca

    const handleSearchChange = (e: { target: { value: string; }; }) => {
        const value = e.target.value;

        if (value.length < previousSearchTerm.current.length) {
            filterSearchLocationOrAssets(value);
        } else {
            filterSearchLocationOrAssets(value);
        }

        // Atualiza o estado da busca e o valor anterior
        setSearchTerm(value);
        previousSearchTerm.current = value;
    };

    return (
        <div className="bg-slate-50 md:space-x-4 grid grid-cols-1 md:grid-cols-3 rounded-md p-4 items-start">
            {/* Header Responsivo */}
            <div className="col-span-1 md:col-span-3 px-4 flex flex-col md:flex-row justify-between items-center md:items-center py-2">
                <h2 className="text-gray-800 text-lg font-roboto font-semibold flex items-center justify-center">
                    Ativos 
                    <h3 className="pl-1 text-sm text-[#77818C] font-normal">/ {companySelected}</h3>
                </h2>
                <div className="flex items-center gap-3 mt-2 md:mt-0">
                    <img 
                        src={filterResetIcon} 
                        onClick={() => {
                            filterAssets('clean'); 
                            setSearchTerm('');
                            filterSearchLocationOrAssets('');
                        }} 
                        alt="" 
                        className="w-5 h-5 cursor-pointer bg-[#2188FF] p-1 rounded-full box-content" 
                        title="Limpar filtro" 
                    />
                    <Button onClick={() => filterAssets('vibration')}>Sensor de Energia</Button>
                    <Button onClick={() => filterAssets('energy')}>Crítico</Button>
                </div>
            </div>

            {/* Sidebar (Busca e Locais) */}
            <div className="col-span-1 border rounded-md p-2 md:min-h-[calc(100vh-200px)]">
                <label htmlFor="search" className="sr-only">Pesquisar</label>
                <input
    id="search"
    type="search"
    value={searchTerm}
    onChange={handleSearchChange}
    placeholder="Buscar Ativo ou Local"
    className="w-full p-2 border rounded text-sm font-roboto"
    aria-label="Pesquisar localização"
/>

                <TreeView nodes={nodes} />
            </div>

            {/* Detalhes do Ativo */}
            <div className="col-span-1 md:col-span-2 border rounded-md p-4 md:min-h-[calc(100vh-200px)]">
                <AssetDetails
                    assetName={assetSelected.label}
                    assetImage={imagemTeste}
                    equipmentType={"Motor Elétrico (Trifásico)"}
                    department={assetSelected.sensorType ?? ""}
                    departmentIcon={
                        <p className="bg-blue-500 text-white rounded-full w-6 h-6 text-sm font-semibold flex items-center justify-center">
                            {assetSelected.sensorType === "energy" ? "E" : "M"}
                        </p>
                    }
                    sensorId={assetSelected.sensorId ?? ""}
                    receiverId={assetSelected.gatewayId ?? ""}
                />
            </div>
        </div>
    );
}
