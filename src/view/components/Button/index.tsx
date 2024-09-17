interface PropsButton {
    type?: "submit" | "reset" | "button";
    title: string ;
    className?: string; 
}

export function Button({ type = "button", title, className = "" }: PropsButton) {
    return (
        <button
            type={type}
            className={`bg-[#17192D] text-white py-2 px-4 rounded-md shadow-md hover:bg-[#1a1f37] focus:outline-none focus:ring-2 focus:ring-[#17192D] focus:ring-offset-2 ${className}`}
        >
            {title}
        </button>
    );
}
