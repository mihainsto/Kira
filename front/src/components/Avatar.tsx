import React from 'react';

interface AvatarProps {
    url?: string;
}

const Avatar: React.FC<AvatarProps> = ({ url }) => {
    return (
        <div
            className="rounded-full w-[100px] h-[100px] bg-gray-700"
            style={{
                backgroundImage: url ? `url(${url})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    );
};

export default Avatar;