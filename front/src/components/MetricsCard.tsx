import React from 'react';
import CountUp from 'react-countup';
import Skeleton from 'react-loading-skeleton';
import Card from './Card';

interface MetricCardProps {
    title: string;
    value: number;
    loading: boolean;
    decimals?: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, loading, decimals = 0 }) => {
    return (
        <Card className="w-[150px] p-2">
            <div className="flex justify-center items-center flex-col">
                <div>
                    <div className="text-sm text-secondary mb-1">{title}</div>
                </div>
                <div>
                    <span className="text-xl font-bold text-primary">
                        {loading ? (
                            <Skeleton width={50} borderRadius={5} baseColor="var(--color-gray-900)"/>
                        ) : (
                            <CountUp
                                end={value}
                                duration={2}
                                separator=","
                                decimals={decimals}
                                prefix="$"
                            />
                        )}
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default MetricCard;