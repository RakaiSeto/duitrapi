'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthLayoutContextType {
    message: ReactNode;
    submessage: ReactNode;
    setMessage: (message: ReactNode) => void;
    setSubmessage: (submessage: ReactNode) => void;
}

const AuthLayoutContext = createContext<AuthLayoutContextType | undefined>(undefined);

export function AuthLayoutProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState<ReactNode>(null);
    const [submessage, setSubmessage] = useState<ReactNode>(null);

    return (
        <AuthLayoutContext.Provider value={{ message, submessage, setMessage, setSubmessage }}>
            {children}
        </AuthLayoutContext.Provider>
    );
}

export function useAuthLayoutContext() {
    const context = useContext(AuthLayoutContext);
    if (!context) {
        throw new Error('useAuthLayoutContext must be used within an AuthLayoutProvider');
    }
    return context;
}