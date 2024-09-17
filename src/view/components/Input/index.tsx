import React from 'react';

interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export function Input({ label, className, ...props }: PropsInput) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <input
                {...props}
                className="
                    px-3 py-2
                    border border-gray-300
                    rounded-md
                    shadow-sm
                    focus:outline-none
                    focus:ring-1 focus:ring-[#17192D]
                    focus:border-[#17192D]
                    placeholder-gray-500
                    transition duration-150 ease-in-out
                    sm:text-sm
                "
            />
        </div>
    );
}
