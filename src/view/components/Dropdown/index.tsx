// src/components/Dropdown.tsx
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface PropsDropdown {
    title: string;
    items: itemsType[];
}

type itemsType = {
    label: string;
    onClick: () => void;
};

export function Dropdown({ title, items }: PropsDropdown) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-[#24292F] shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {title}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <Menu.Items
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="">
                    {items.map((item, index) => (
                        <MenuItem key={index}>
                            <a
                                href="#"
                                className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                                            ${index === 0 ? 'rounded-t-md' : ''} 
                                            ${index === items.length - 1 ? 'rounded-b-md' : ''} 
                                            ${index !== items.length - 1 ? 'border-b-[1px]' : ''}`}
                                onClick={item.onClick}
                            >
                                {item.label}
                            </a>
                        </MenuItem>
                    ))}
                </div>
            </Menu.Items>
        </Menu>
    );
}
