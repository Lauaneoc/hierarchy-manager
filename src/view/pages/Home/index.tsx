import { useApiTractian } from "../../../@shared/contexts/ApiTractianContext";
import { TreeView } from "../../components";

export function Home() {
    const { locations } = useApiTractian();

    return (
        <div className="bg-slate-100 flex-grow rounded-md p-4">
            <TreeView data={locations} />
        </div>
    )
}