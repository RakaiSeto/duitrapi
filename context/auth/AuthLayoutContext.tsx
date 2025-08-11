'use client';

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthLayoutContextType {
    message: string;
    submessage: string;
    setMessage: (message: string) => void;
    setSubmessage: (submessage: string) => void;
}

const AuthLayoutContext = createContext<AuthLayoutContextType | undefined>(undefined);

export function AuthLayoutProvider({ children }: { children: ReactNode }) {
    const [message, setMessage] = useState('');
    const [submessage, setSubmessage] = useState('');

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