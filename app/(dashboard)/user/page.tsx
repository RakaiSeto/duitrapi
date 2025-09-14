'use client';

import { useDashboardLayoutContext } from '@/context/auth/DashboardLayoutContext';
import StatsOverview from '@/component/page/dashboard/statsOverview';
import dynamic from 'next/dynamic';
import { Wallets } from '@/db/dal/wallets';
import { useEffect, useState } from 'react';
import WalletInfo from '@/component/page/dashboard/walletInfo';

const DynamicChartComponent = dynamic(() => import('@/component/page/dashboard/chartComponent'), {
    ssr: false,
    loading: () => (
        <div className="bg-white dark:bg-white/10 p-4 rounded-lg h-[25vh] flex justify-center items-center">Loading..</div>
    ),
});

export default function DashboardPage() {
    const { userName } = useDashboardLayoutContext();
    const [wallets, setWallets] = useState<Wallets[]>([]);
    useEffect(() => {
        const fetchWallets = async () => {
            const response = await fetch('/api/user/dashboard');
            const data = await response.json();
            setWallets(data.data.wallet);
        };
        fetchWallets();
    }, []);

    return (
        <div className="rounded-lg bg-[#fbfbfb] dark:bg-[#091636d9] p-5 w-full flex flex-col gap-y-4 min-h-full">
            <div className="flex flex-col gap-y-4">
                <span className="text-2xl">Hey, {userName}</span>
                <span>Discover the start of your better financial health here</span>
            </div>

            {/* dashboard container */}
            <div className="flex flex-col gap-y-4 min-h-0">
                {/* stats overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                        value="88,888,888,888"
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
                        title="Daily Expenses"
                        description="How much money you spent today"
                        value="1,000"
                    />
                </div>

                {/* stats cards */}
                <DynamicChartComponent />

                {/* wallet info */}
                <WalletInfo wallets={wallets} />
            </div>
        </div>
    );
}
