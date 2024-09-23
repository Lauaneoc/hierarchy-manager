import { TreeView } from '../../components';
import imagemTeste from '../../../assets/imagemTeste.png';
import filterResetIcon from '../../../assets/FilterReset.svg';
import { Button } from '../../components/Button';
import { AssetDetails } from '../../components/AssetsDetails';
import LineChart from '../../components/visx/LineChart';
import { useHomeData } from './useHomeData';

export function Home() {
  const {
    sensorData,
    nodes,
    companySelected,
    assetSelected,
    searchTerm,
    handleSearchChange,
    resetFilters,
    filterAssets,
  } = useHomeData(); 

  return (
    <div className="bg-slate-50 md:space-x-4 grid grid-cols-1 md:grid-cols-3 rounded-md p-4 items-start">
      <div className="col-span-1 md:col-span-3 px-4 flex flex-col md:flex-row justify-between items-center md:items-center py-2">
        <h2 className="text-gray-800 text-lg font-roboto font-semibold flex items-center justify-center">
          Ativos
          <h3 className="pl-1 text-sm text-[#77818C] font-normal">/ {companySelected}</h3>
        </h2>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <img
            src={filterResetIcon}
            onClick={resetFilters}
            alt=""
            className="w-5 h-5 cursor-pointer bg-[#2188FF] p-1 rounded-full box-content"
            title="Limpar filtro"
          />
          <Button onClick={() => filterAssets('vibration')}>Sensor de Vibração</Button>
          <Button onClick={() => filterAssets('energy')}>Crítico</Button>
        </div>
      </div>

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

      <div className="col-span-1 md:col-span-2 border rounded-md p-4 mt-2 md:mt-0 md:min-h-[calc(100vh-200px)]">
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

        <div className="flex flex-col justify-end mt-2">
            {assetSelected.label ? (
                <div>
                <h1 className='text-gray-800 text-lg font-roboto font-semibold flex items-center justify-center py-2'>Monitoramento do Sensor de {assetSelected.sensorType === 'vibration' ? 'Vibração' : 'Energia'}</h1>
                <LineChart data={sensorData} width={100} height={300} />
                </div>
            ) : (
                <div className='p-5 border-[1px] py-40 md:py-5 rounded-md text-center'>Sem dados para visualizar</div>
            )}
        </div>
      </div>
    </div>
  );
}
