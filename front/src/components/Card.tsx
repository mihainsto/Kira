import React from 'react';

type CardProps = {
    children: React.ReactNode;
    className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = ''}) => {
    return (
        <div className={`border-gray-800 border-1 rounded-[20px] ${className}`}>
            {children}
        </div>
    );
};

export default Card;