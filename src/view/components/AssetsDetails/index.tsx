import React from 'react';
import { SensorIcon } from "../../../assets/Sensor";
import { MdOutlineRouter } from "../../../assets/MdOutlineRouter";
import { FlashIcon } from '../../../assets/FlashIcon';

interface AssetDetailsProps {
  assetName: string;
  assetImage: string;
  equipmentType: string;
  department: string;
  departmentIcon: React.ReactNode;
  sensorId: string;
  receiverId: string;
}

export const AssetDetails: React.FC<AssetDetailsProps> = ({
  assetName,
  assetImage,
  equipmentType,
  department,
  departmentIcon,
  sensorId,
  receiverId
}) => {
  return (
    <div className="col-span-2 border rounded-md overflow-hidden">
      {!assetName && (
        <h3 className='h-[30vh] flex items-center justify-center font-roboto'>Nenhum ativo selecionado</h3>
      )}
      {assetName && (
        <>
          <h2 className="text-lg font-inter font-bold border-b p-4 bg-slate-100 flex gap-2 items-center">
          {assetName}
          {department === 'energy' && <FlashIcon />}
          {department === 'vibration' && <p className='w-2 h-2 bg-[#ED3833] rounded-full'></p>}
          </h2>

          <div className="p-6 flex gap-8">
            <img 
              src={assetImage} 
              alt={`Imagem do equipamento ${assetName}`} 
              className="w-48 h-48 object-cover rounded-md shadow-sm"
            />

            <div className="flex-1 space-y-8">
              <div className="border-b pb-4">
                <h3 className="text-gray-800 text-lg font-roboto font-semibold mb-2">
                  Tipo de Equipamento
                </h3>
                <p className="text-gray-600 text-base">
                  {equipmentType}
                </p>
              </div>

              <div>
                <h3 className="text-gray-800 text-lg font-roboto font-semibold mb-2">
                  Responsáveis
                </h3>
                <p className="text-gray-600 text-base flex items-center gap-2 ">
                  {departmentIcon}
                  {department == "energy" ? "Elétrica" : "Mecânica"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 flex border-t-[1px]">
            <div className="w-[50%]">
              <h3 className="text-gray-800 text-lg font-roboto font-semibold">
                Sensor
              </h3>
              <p className="text-gray-600 text-base flex gap-1">
                <SensorIcon /> {sensorId}
              </p>
            </div>
            <div>
              <h3 className="text-gray-800 text-lg font-roboto font-semibold">
                Receptor
              </h3>
              <p className="text-gray-600 text-base flex gap-1">
                <MdOutlineRouter /> {receiverId}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
