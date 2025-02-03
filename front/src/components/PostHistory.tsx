import { format, addMonths, startOfMonth, endOfMonth, getDay, isSameMonth } from 'date-fns';
import SocialBanner from "./SocialBanner.tsx";

type PostData = {
    date: string;
    count: number;
};

const PostingHistory = () => {
    // Generate fake post data for the last 12 months
    const generateFakeData = (): PostData[] => {
        const data: PostData[] = [];
        const today = new Date();
        const startDate = addMonths(today, -11);

        for (let i = 0; i < 100; i++) {
            const randomMonth = Math.floor(Math.random() * 12);
            const randomDay = Math.floor(Math.random() * 28) + 1;
            const date = new Date(startDate.getFullYear(), startDate.getMonth() + randomMonth, randomDay);
            data.push({
                date: date.toISOString().split('T')[0],
                count: 1
            });
        }

        return data;
    };

    const posts = generateFakeData();
    const today = new Date();
    const months = Array.from({ length: 12 }, (_, i) => addMonths(today, -11 + i));

    const getPostsForDay = (date: Date): number => {
        const dateStr = date.toISOString().split('T')[0];
        return posts.some(post => post.date === dateStr) ? 1 : 0;
    };

    return (
        <div className="">
            <div className="mb-4 text-sm flex justify-between">
                <div className="flex flex-col sm:flex-row md:items-center">
                    <span className="text-primary text-xl font-bold">Posting history</span>
                    <span className="sm:ml-2 text-primary text-xs lg:text-sm">
                        Last posted: {format(new Date(), 'do MMM yy')}
                    </span>
                </div>

                <SocialBanner variant="tiktok" heading="TikTok data only"/>
            </div>

            <div className="flex">
                <div className="flex flex-col mr-2 space-y-1 mt-6 text-primary text-[0.5rem] font-bold">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                        <div key={day + i} className="h-3 flex items-center">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="flex space-x-2 lg:space-x-6 overflow-x-auto pb-4 justify-between">
                    {months.map((month) => {
                        const firstDay = startOfMonth(month);
                        const lastDay = endOfMonth(month);
                        const firstDayIndex = getDay(firstDay);
                        const totalDays = lastDay.getDate();
                        const totalColumns = Math.ceil((totalDays + firstDayIndex) / 7);

                        const columns = Array(totalColumns)
                            .fill(null)
                            .map((_, colIndex) => {
                                return Array(7)
                                    .fill(null)
                                    .map((_, rowIndex) => {
                                        const dayIndex = colIndex * 7 + rowIndex - firstDayIndex;
                                        if (dayIndex < 0 || dayIndex >= totalDays) return null;

                                        const currentDate = new Date(firstDay);
                                        currentDate.setDate(currentDate.getDate() + dayIndex);
                                        return isSameMonth(currentDate, month) ? currentDate : null;
                                    });
                            });

                        return (
                            <div key={month.toString()} className="space-y-2 flex-shrink-0">
                                <div className="text-xs text-primary">
                                    {format(month, 'MMM')}
                                </div>

                                <div className="flex gap-1">
                                    {columns.map((column, colIndex) => (
                                        <div key={`col-${colIndex}`} className="flex flex-col gap-1">
                                            {column.map((day, rowIndex) => {
                                                if (!day) {
                                                    return <div key={`empty-${colIndex}-${rowIndex}`} className="h-3 w-3" />;
                                                }

                                                const hasPost = getPostsForDay(day);
                                                return (
                                                    <div
                                                        key={day.toString()}
                                                        className={`h-3 w-3 rounded-sm ${
                                                            hasPost ? 'bg-green-800' : 'bg-gray-900'
                                                        }`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostingHistory;
