import React from 'react';
import { FaTiktok, FaInstagram, FaYoutube, FaExternalLinkAlt } from "react-icons/fa";

interface SocialBannerProps {
    heading: string;
    variant: "tiktok" | "instagram" | "youtube";
    link?: string;
    className?: string;
}

const SocialBanner: React.FC<SocialBannerProps> = ({ heading, variant, link, className }) => {
    const variantConfig = {
        tiktok: <FaTiktok className="text-sm sm:text-xl text-primary" />,
        instagram: <FaInstagram className="text-sm sm:text-xl text-primary" />,
        youtube: <FaYoutube className="text-sm sm:text-xl text-primary" />
    };

    const icon = variantConfig[variant];

    const content = (
        <div className={`flex items-center justify-center bg-gray-900 rounded-full px-2 sm:py-1 w-max ${className}`}>
            {icon}
            <span className="text-xs ml-1 text-primary">{heading}</span>
            {link && <FaExternalLinkAlt className="text-sm text-primary ml-1" size={10}/>}
        </div>
    );

    return link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
            {content}
        </a>
    ) : (
        content
    );
};

export default SocialBanner;
