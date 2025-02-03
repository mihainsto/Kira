import React from "react";
import { IconType } from "react-icons";

interface IconButtonProps {
    icon: IconType;
    onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon: Icon, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="p-2 bg-transparent hover:bg-gray-800 transition-colors cursor-pointer "
        >
            <Icon className="text-[#ccff00] text-2xl" /> {/* Neon green color */}
        </div>
    );
};

export default IconButton;
