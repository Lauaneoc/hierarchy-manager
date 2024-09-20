import { useApiTractian } from "../../../@shared/contexts/ApiTractianContext";
import { TreeView } from "../../components";
import imagemTeste from '../../../assets/imagemTeste.png';
import { SensorIcon } from "../../../assets/Sensor";
import { MdOutlineRouter } from "../../../assets/MdOutlineRouter";

export function Home() {
    const { locations } = useApiTractian();

    return (
        <div className="bg-slate-50 space-x-4 grid grid-cols-3 rounded-md p-4">
            <p className="col-span-3 px-4">lala</p>
            <div className="col-span-1 border rounded-md p-2">
                <label htmlFor="search" className="sr-only">Pesquisar</label>
                <input
                    id="search"
                    type="search"
                    placeholder="Pesquisar"
                    className="w-full p-2 border rounded"
                    aria-label="Pesquisar localização"
                />
                <TreeView data={locations} />
            </div>

            <div className="col-span-2 border rounded-md overflow-hidden">
                <h2 className="text-lg font-inter font-bold border-b p-4 bg-slate-100">
                    MOTOR RT COAL AF01
                </h2>

                <div className="p-6 flex gap-8">
                    <img 
                        src={imagemTeste} 
                        alt="Imagem do equipamento MOTOR RT COAL AF01" 
                        className="w-48 h-48 object-cover rounded-md shadow-sm"
                    />

                    <div className="flex-1 space-y-8">
                        <div className="border-b pb-4">
                            <h3 className="text-gray-800 text-lg font-roboto font-semibold mb-2">
                                Tipo de Equipamento
                            </h3>
                            <p className="text-gray-600 text-base">
                                Motor Elétrico (Trifásico)
                            </p>
                        </div>

                        <div>
                            <h3 className="text-gray-800 text-lg font-roboto font-semibold mb-2">
                                Responsáveis
                            </h3>
                            <p className="text-gray-600 text-base flex items-center gap-2">
                                <p className="bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
                                    E
                                </p>
                                Elétrica
                            </p>
                        </div>
                    </div>
                </div>
                <div className="p-6 flex border-t-[1px] ">
                    <div className="w-[50%]">
                        <h3 className="text-gray-800 text-lg font-roboto font-semibold">
                        Sensor
                        </h3>
                        <p className="text-gray-600 text-base flex gap-1">
                            <SensorIcon /> HIO4510
                        </p>
                    </div>
                    <div>
                    <h3 className="text-gray-800 text-lg font-roboto font-semibold">
                        Receptor 
                        </h3>
                        <p className="text-gray-600 text-base flex gap-1">
                            <MdOutlineRouter /> EUH4R27
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
