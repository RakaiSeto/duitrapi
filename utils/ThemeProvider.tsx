'use client';

import { useState, useEffect, createContext, useContext } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('themePreference') as Theme | null;
        if (savedTheme) {
            setThemeState(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        } 
        else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setThemeState('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setThemeState('light');
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('themePreference', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
