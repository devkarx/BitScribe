import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600 hover:bg-blue-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button 
            type={type} 
            className={`px-4 py-2 cursor-pointer rounded-lg transition-colors duration-200 ${bgColor} ${textColor} ${className}`} 
            {...props}
        >
            {children} 
        </button>
    );
}