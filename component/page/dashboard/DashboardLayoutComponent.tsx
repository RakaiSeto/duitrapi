'use client';

import Header from '../../shared/header';
import Sidebar from '../../shared/sidebar/sidebar';
import { useEffect, useState } from 'react';
import { useDashboardLayoutContext } from '@/context/auth/DashboardLayoutContext';

export default function DashboardLayoutComponent({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { userName, isAdmin } = useDashboardLayoutContext();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                // Tailwind's 'lg' breakpoint is 1024px
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        // Set initial state
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header setIsSidebarOpen={setIsSidebarOpen} userName={userName} isAdmin={isAdmin} />
            <div className="flex w-full h-full flex-1">
                <Sidebar isSidebarOpen={isSidebarOpen} isAdmin={isAdmin} />
                <div className="w-full h-full p-[1.5rem] bg-[#edededcc] dark:bg-[#202b48]">{children}</div>
            </div>
        </div>
    );
}
