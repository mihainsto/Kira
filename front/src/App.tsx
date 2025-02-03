import './App.css'
import DailyGraph from "./components/DailyGraph.tsx";
import PostHistory from "./components/PostHistory.tsx";
import {useEffect, useState} from "react";
import Card from "./components/Card.tsx";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import SocialBanner from "./components/SocialBanner.tsx";
import { FaBookmark, FaShareAlt } from "react-icons/fa";
import { IoLanguageOutline } from "react-icons/io5";
import IconButton from "./components/IconButton.tsx";
import SocialStat from "./components/SocialStat.tsx";
import {useDemoKiraBaseData, useDemoKiraStatsHistory} from "./api/hooks.ts";
import Avatar from "./components/Avatar.tsx";
import {formatNumber, formatPercentage, languageMapper, regionMapper} from "./utils/utils.ts";
import { IoIosPin } from "react-icons/io";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MetricCard from "./components/MetricsCard.tsx";

interface SocialStat {
    platform: string;
    followers: string;
    averageViews: string;
    sponsoredViews: string;
    totalLikes: string;
    engagementRate: string;
    totalPosts: string;
}

interface AnalyticsData {
    predictedFee: number;
    predictedCPV: number;
    socialStats: SocialStat[];
}

const SocialDashboard = () => {
    const {data: baseData, loading} = useDemoKiraBaseData();
    const {data: graphData, loading: graphLoading} = useDemoKiraStatsHistory();

    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>();

    useEffect(() => {
        if(baseData)
            setAnalyticsData({
                predictedFee: baseData.predictedFee,
                predictedCPV: baseData.predictedCpv,
                socialStats: [
                    {
                        platform: "tiktok",
                        followers: formatNumber(baseData.data.tiktok.followersCount),
                        averageViews: formatNumber(baseData.data.tiktok.medianViews),
                        sponsoredViews: formatNumber(baseData.data.tiktok.sponsoredMedianViews),
                        totalLikes: formatNumber(baseData.data.tiktok.likesCount),
                        engagementRate: formatPercentage(baseData.data.tiktok.engagementRate),
                        totalPosts: formatNumber(baseData.data.tiktok.postsCount)
                    },
                    {
                        platform: "instagram",
                        followers: "42.8m",
                        averageViews: "0",
                        sponsoredViews: "0",
                        totalLikes: "0",
                        engagementRate: formatPercentage(baseData.data.tiktok.engagementRate),
                        totalPosts: "0"
                    }
                ]
            });
    }, [baseData]);

    return (
        <div className="min-h-screen bg-black text-white p-6 flex justify-center w-full">
            <div className="w-full md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl md:px-10 xl:p-0">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8 flex-col">
                    {loading ? <Skeleton circle={true} height={100} width={100} baseColor="var(--color-gray-900)"/> :
                        <Avatar url={baseData?.data.tiktok.profilePicture}/>}
                    <div className="mt-2">
                        <div className="flex items-center justify-center">
                            <h1 className="text-2xl font-bold text-primary">{loading ?
                                <Skeleton width={200} baseColor="var(--color-gray-900)"/> : baseData?.data.tiktok.nickname}</h1>
                            <div className="flex ml-10 gap-2">
                                <IconButton icon={FaBookmark} onClick={() => {
                                }}/>
                                <IconButton icon={FaShareAlt} onClick={() => {
                                }}/>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400 justify-center mt-2">
                            <span className="flex items-center gap-1">
                                <IoIosPin className="w-4 h-4 text-primary"/>
                                <span className="text-primary">
                                    {loading ? <Skeleton width={100}
                                                         borderRadius={10} baseColor="var(--color-gray-900)"/> : baseData && regionMapper(baseData.data.tiktok.region)}
                                </span>
                            </span>
                            <span className="flex items-center gap-1">
                                <IoLanguageOutline className="w-4 h-4 text-primary"/>
                                <span className="text-primary">
                                    {loading ? <Skeleton width={100}
                                                         borderRadius={10} baseColor="var(--color-gray-900)"/> : baseData && languageMapper(baseData.data.tiktok.language)}
                                </span>
                            </span>
                        </div>
                        <div className="mt-3 flex justify-center gap-1">
                            {loading ? <Skeleton width={300} height={30} borderRadius={10} baseColor="var(--color-gray-900)"/> : (
                                <>
                                    <SocialBanner variant="tiktok" heading={`@${baseData?.data.tiktok.handle}`}
                                                  className="rounded-md"/>
                                    <SocialBanner variant="instagram" heading={`@${baseData?.data.instagram.handle}`}
                                                  link={"https://www.instagram.com/" + baseData?.data.instagram.handle}
                                                  className="rounded-md"/>
                                    <SocialBanner variant="youtube" heading="YouTube"
                                                  link={`https://www.youtube.com/${baseData?.data.youtube.channelId}`}
                                                  className="rounded-md"/>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="flex gap-3 mb-8 justify-center flex-wrap">
                    {['Average Kyra fee', 'Average Kyra CPV', 'Predicted fee', 'Predicted CPV'].map((title, i) => (
                        <MetricCard
                            key={i}
                            title={title}
                            value={i > 1 ? (i === 2 ? analyticsData?.predictedFee || 0 : analyticsData?.predictedCPV || 0) : 0}
                            loading={loading}
                            decimals={i > 2 ? 2 : 0}
                        />
                    ))}
                </div>

                {/* Profile Bio */}
                <Card className="mb-8 p-6">
                    <div className="text-primary text-xl font-bold">
                        Profile bio
                    </div>
                    <div className="mt-5 flex ">
                        {loading ? <Skeleton width={300} height={30} borderRadius={10} baseColor="var(--color-gray-900)"/> : (
                            <>
                                <SocialBanner variant="tiktok" heading={`@${baseData?.data.tiktok.handle}`}/>
                                <span className="ml-4 text-primary">
                                    {baseData?.data.tiktok.bio}
                                </span>
                            </>
                        )}
                    </div>
                </Card>

                {/* Stats Section */}
                <Card className="mb-8 p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-1 lg:gap-4">
                        {loading ? (
                            <Skeleton count={2} height={100} borderRadius={10} baseColor="var(--color-gray-900)"/>
                        ) : (
                            analyticsData?.socialStats.map((stat, index) => (
                                <div key={index} className="sm:mb-0 sm:p-0">
                                    <div className="flex justify-between items-center flex-col lg:flex-row">
                                        <div className="mb-2 sm:mb-0">
                                            {stat.platform === 'tiktok' ? <FaTiktok size={25}/> :
                                                <FaInstagram size={25}/>}
                                        </div>
                                        <SocialStat title="Followers" value={stat.followers}/>
                                        <SocialStat title="Average views" value={stat.averageViews}/>
                                        <SocialStat title="Potential sponsored views" value={stat.sponsoredViews}/>
                                        <SocialStat title="Total likes" value={stat.totalLikes}/>
                                        <SocialStat title="Engagement rate" value={stat.engagementRate}/>
                                        <SocialStat title="Total posts" value={stat.totalPosts}/>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                {/* Activity Chart */}
                <Card className="mb-8 p-6">
                    {graphLoading && !graphData?.data.historyPoints ? <Skeleton height={300} borderRadius={10} baseColor="var(--color-gray-900)"/> :
                        <DailyGraph data={graphData?.data.historyPoints.map((item) => ({
                            createdAt: item.createdAt,
                            likesCount: item.likesCount,
                            followersCount: item.followersCount
                        }))}/>}
                </Card>

                {/* Post History */}
                <Card className="mb-8 p-6">
                    {loading ? <Skeleton height={300} borderRadius={10} baseColor="var(--color-gray-900)"/> : <PostHistory/>}
                </Card>
            </div>
        </div>
    );
};

export default SocialDashboard;