'use client';

import { useDashboardLayoutContext } from '@/context/auth/DashboardLayoutContext';
import StatsOverview from '@/component/page/dashboard/statsOverview';
import dynamic from 'next/dynamic';

const DynamicChartComponent = dynamic(() => import('@/component/page/dashboard/chartComponent'), {
    ssr: false,
    loading: () => <div className="bg-white dark:bg-white/10 p-4 rounded-lg h-[25vh] flex justify-center items-center">Loading..</div>,
});

export default function DashboardPage() {
    const { userName } = useDashboardLayoutContext();

    return (
        <div className="rounded-lg bg-[#fbfbfb] dark:bg-[#091636d9] p-5 w-full flex flex-col gap-y-4 min-h-full">
            <div className="flex flex-col gap-y-4">
                <span className="text-2xl">Hey, {userName}</span>
                <span>Discover the start of your better financial health here</span>
            </div>

            {/* dashboard container */}
            <div className="flex flex-col gap-y-4 min-h-0">
                {/* stats overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatsOverview
                        color="#4E72FF"
                        icon="fa-money-check-dollar"
                        title="Total Balance"
                        description="Total balance of all wallets"
                        value="1,000"
                    />
                    <StatsOverview
                        color="#f82f2f"
                        icon="fa-money-bill-transfer"
                        title="Monthly Expenses"
                        description="How much money you spent this month"
                        value="1,000"
                    />
                    <StatsOverview
                        color="#10bb0a"
                        icon="fa-money-bill-trend-up"
                        title="Monthly Income"
                        description="How much money you get this month"
                        value="1,000"
                    />
                    <StatsOverview
                        color="#ff7b0d"
                        icon="fa-calendar-days"
                        title="Daily Net Expenses"
                        description="How much money you spent today"
                        value="1,000"
                    />
                </div>

                {/* stats cards */}
                <DynamicChartComponent />
            </div>
        </div>
    );
}
