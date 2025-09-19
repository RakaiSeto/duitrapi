'use client';

import { createContext, useContext, ReactNode } from "react";

interface DashboardLayoutContextType {
    isAdmin: boolean;
    userName: string;
}

const DashboardLayoutContext = createContext<DashboardLayoutContextType | undefined>(undefined);

export function DashboardLayoutProvider({ children, userName, isAdmin }: { children: ReactNode, userName: string, isAdmin: boolean }) {

    return (
        <DashboardLayoutContext.Provider value={{ isAdmin, userName }}>
            {children}
        </DashboardLayoutContext.Provider>
    )
}

export function useDashboardLayoutContext() {
    const context = useContext(DashboardLayoutContext);
    if (!context) {
        throw new Error('useDashboardLayoutContext must be used within a DashboardLayoutProvider');
    }
    return context;
}