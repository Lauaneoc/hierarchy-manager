// src/components/Header.tsx
import { Dropdown } from '..'; // Certifique-se de que o Dropdown está corretamente importado
import { useApiTractian } from '../../../@shared/contexts/ApiTractianContext';
import { useAuth } from '../../../@shared/contexts/AuthContext';
import { LogoTractian } from '../../../assets/LOGO TRACTIAN';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';

export function Header() {
    const { logout } = useAuth(); 
    const { companies, fetchCompanyLocations } = useApiTractian();

    return (
        <div className="bg-[#17192D] px-7 py-5 flex justify-between items-center">
            <LogoTractian />
            <div className='flex justify-between items-center gap-5'>
                <Dropdown 
                    title="Selecione uma empresa" 
                    items={ companies ? companies.map(company => ({
                        label: company.name,
                        onClick: () => {
                            fetchCompanyLocations(company.id)
                        }
                    })) : []}
                />
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2 cursor-pointer text-white" onClick={logout} title='Sair' /> 
            </div>
        </div>
    );
}
