// types.ts
export interface TikTokData {
    externalId: string;
    id: string;
    handle: string;
    followersCount: number;
    engagementRate: number;
    followingCount: number;
    likesCount: number;
    postsCount: number;
    region: string;
    bio: string;
    isPrivate: boolean;
    isVerified: boolean;
    isActive: boolean;
    medianEngagement: number;
    medianViews: number;
    sponsoredMedianEngagement: number;
    sponsoredMedianViews: number;
    isBrand: boolean;
    isKyra: boolean;
    profilePicture: string;
    nickname: string;
    language: string;
    mostRecentPostsWithTypes: any[];
}

export interface InstagramData {
    handle: string;
}

export interface YouTubeData {
    channelId: string;
}

export interface GeneralData {
    email: string | null;
}

export interface DemoKiraBaseData {
    id: string;
    tiktok: TikTokData;
    instagram: InstagramData;
    youtube: YouTubeData;
    general: GeneralData;
    predAge: string;
    predGender: string;
}

export interface UseDemoKiraBaseDataResponse {
    data: DemoKiraBaseData;
    predictedFee: number;
    predictedCpv: number;
}

export interface DeltaData {
    absolute: number;
    percentage: number;
}

export interface HistoryPoint {
    postsCount: number;
    likesCount: number;
    followersCount: number;
    followingCount: number;
    viewsCount: number;
    createdAt: string;
}

export interface DemoKiraStatsHistory {
    delta: {
        postsCount: DeltaData;
        likesCount: DeltaData;
        followersCount: DeltaData;
        followingCount: DeltaData;
    };
    historyPoints: HistoryPoint[];
}

export interface UseDemoKiraStatsHistoryResponse {
    data: DemoKiraStatsHistory;
}
