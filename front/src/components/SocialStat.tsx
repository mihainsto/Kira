import React from "react";
import CountUp from "react-countup";

interface SocialStatProps {
    title: string;
    value: string | number;
}

const SocialStat: React.FC<SocialStatProps> = ({ title, value }) => {
    const isNumber = typeof value === 'number' || !isNaN(Number(value.replace(/[^0-9.-]+/g, "")));

    return (
        <div className="flex flex-col items-center py-2 sm:p-4 rounded-md">
            <div className="text-secondary text-sm text-center">{title}</div>
            <div className="font-semibold text-primary text-xl sm:text-3xl text-centered">
                {isNumber ? (
                    <CountUp end={parseFloat(value.toString().replace(/[^0-9.-]+/g, ""))} duration={2} separator="," decimals={value.toString().includes('.') ? 1 : 0} suffix={value.toString().replace(/[0-9.,-]+/g, "")} />
                ) : (
                    value || <span>—</span>
                )}
            </div>
        </div>
    );
};

export default SocialStat;