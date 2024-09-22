interface PropsButton {
    type?: "submit" | "reset" | "button";
    children: React.ReactNode ;
    className?: string; 
    onClick?: () => void
}

export function Button({ type = "button", children, className = "", onClick}: PropsButton) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`text-[#77818C] hover:bg-[#2188FF] active:bg-[#2188FF] hover:text-white text-sm font-roboto py-1.5 px-4 rounded-md shadow-md focus:outline-none  focus:bg-[#2188FF] focus:text-white ${className}`}
        >
            {children}
        </button>
    );
}
