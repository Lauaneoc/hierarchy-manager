// src/components/Header.tsx
import {  ArrowLongUpIcon } from '@heroicons/react/24/outline';
import { Dropdown } from '..';
import { useAuth } from '../../../@shared/contexts/AuthContext';
import { LogoTractian } from '../../../assets/LOGO TRACTIAN';

export function Header() {
    const { logout } = useAuth(); // Obtém a função de logout do contexto

    return (
        <div className="bg-[#17192D] px-7 py-5 flex justify-between items-center">
            <LogoTractian />
            <div className='flex justify-between items-center gap-5'>
                <Dropdown 
                    title="Selecione uma empresa" 
                    items={[
                        { label: "Empresa1", onClick: () => {} }, 
                        { label: "Empresa2", onClick: () => {} },
                    ]}
                />
                <ArrowLongUpIcon className="w-5 h-5 mr-2 cursor-pointer" onClick={logout} /> 
            </div>
        </div>
    );
}
