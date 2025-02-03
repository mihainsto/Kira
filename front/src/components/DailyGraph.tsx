import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import SocialBanner from "./SocialBanner.tsx";
import { useMediaQuery } from 'react-responsive';
import React from "react";

type DataPoint = {
    createdAt: string;
    likesCount: number;
    followersCount: number;
};

const LegendIndicator: React.FC = () => {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex items-center">
                <span className="w-4 h-4 bg-green-800 rounded-sm"></span>
                <span className="ml-2 text-primary text-sm">Daily likes</span>
            </div>
            <div className="flex items-center">
                <span className="w-4 h-4 bg-green-600 rounded-sm"></span>
                <span className="ml-2 text-primary text-sm">Daily followers</span>
            </div>
        </div>
    );
};

interface TikTokStatsGraphProps {
    data?: DataPoint[];
}

const TikTokStatsGraph: React.FC<TikTokStatsGraphProps> = ({ data }) => {
    const isMobile = useMediaQuery({ query: '(max-width: 640px)' });

    const formatYAxis = (value: number): string => {
        if (value === 0) return '0';
        if (Math.abs(value) >= 1000000) return `${value / 1000000}m`;
        return value.toString();
    };

    const formatXAxis = (value: number) => {
        const date = new Date(value);
        return `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}`;
    };

    const formatTooltipValue = (value: number) => {
        return new Intl.NumberFormat('en-US').format(value);
    };

    const CustomTooltip = ({ active, payload, label }: {active: boolean, payload: {value: number}[], label: number}) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a1a1a] p-2 rounded">
                    <p className="text-secondary text-sm">{formatXAxis(label)}</p>
                    <p className="text-secondary text-sm">
                        Likes: {formatTooltipValue(payload[0].value)}
                    </p>
                    <p className="text-secondary text-sm">
                        Followers: {formatTooltipValue(payload[1].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomXAxisTick = ({ x, y, payload }: { x: number; y: number; payload: { value: number } }) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={5} dx={-5} textAnchor="end" fill="var(--color-primary)" transform="rotate(-90)" className="text-xs">
                    {formatXAxis(payload.value)}
                </text>
            </g>
        );
    };

    const CustomYAxisTick = ({ x, y, payload }: {x: number, y: number, payload: {value: number}}) => {
        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={0} dx={-5} textAnchor="end" fill="var(--color-primary)"  className="text-xs">
                    {formatYAxis(payload.value)}
                </text>
            </g>
        );
    };

    return (
        <div className="w-full bg-black">
            <div className="flex justify-between">
                <LegendIndicator />
                <SocialBanner variant="tiktok" heading="TikTok data only"/>
            </div>

            <div className="w-full h-100 mt-3">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{top: 5, right: 30, left: -25, bottom: 5}}
                    >
                        <defs>
                            <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-green-800)" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="var(--color-black)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-green-600)" stopOpacity={0.8}/>
                                <stop offset="100%" stopColor="var(--color-black)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="createdAt"
                            tickFormatter={formatXAxis}
                            stroke="var(--color-primary)"
                            tick={<CustomXAxisTick/>}
                            height={60}
                            tickSize={0}
                            interval={isMobile ? 3 : 0}
                        />
                        <YAxis
                            domain={[-5000000, 35000000]}
                            tickFormatter={formatYAxis}
                            tickSize={0}
                            stroke="var(--color-primary)"
                            tick={<CustomYAxisTick/>}
                            ticks={[-5000000, 0, 5000000, 10000000, 15000000, 20000000, 25000000, 30000000, 35000000]}
                        />

                        <Tooltip content={<CustomTooltip/>}/>

                        <Area
                            name="Daily likes"
                            type="linear"
                            dataKey="likesCount"
                            stroke="var(--color-green-800)"
                            fill="url(#colorLikes)"
                            fillOpacity={0.3}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{r: 4, fill: 'var(--color-green-800)'}}
                        />
                        <Area
                            name="Daily followers"
                            type="linear"
                            dataKey="followersCount"
                            stroke="var(--color-green-600)"
                            fill="url(#colorFollowers)"
                            fillOpacity={0.3}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{r: 4, fill: 'var(--color-green-600)'}}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TikTokStatsGraph;
