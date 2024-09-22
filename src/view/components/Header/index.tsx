// src/components/Header.tsx
import { useApiTractian } from '../../../@shared/contexts/ApiTractianContext';
import { useAuth } from '../../../@shared/contexts/AuthContext';
import { LogoTractian } from '../../../assets/LOGO TRACTIAN';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid';
import { Button } from '../Button';
import { CompanyIcon } from '../../../assets/CompanyIcon';

export function Header() {
    const { logout } = useAuth(); 
    const { companies, fetchCompanyLocations, setCompanySelected } = useApiTractian();

    return (
        <div className="bg-[#17192D] px-7 py-5 flex justify-between items-center">
            <LogoTractian />
            <div className='flex justify-between items-center gap-5'>
                {companies.map(item => (
                    <Button  
                        onClick={() => {
                            fetchCompanyLocations(item.id)
                            setCompanySelected(item.name)
                        }}
                        className='flex items-center gap-2 bg-[#023B78] text-white'>
                        <CompanyIcon />
                        {item.name}
                    </Button>
                ))}
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2 cursor-pointer text-white" onClick={logout} title='Sair' /> 
            </div>
        </div>
    );
}
