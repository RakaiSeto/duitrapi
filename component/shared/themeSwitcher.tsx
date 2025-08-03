'use client';
import { useTheme } from '../../utils/ThemeProvider';

export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="cursor-pointer ">
            <button
                type="button"
                className={`flex items-center gap-x-2 py-2 px-3 bg-[#bac0d3] rounded-full text-sm text-white hover:bg-[#616c89] focus:outline-hidden focus:bg-[#616c89] cursor-pointer ${
                    theme === 'dark' ? 'hidden' : ''
                }`}
                id="themeSwitcherDarkButton"
                onClick={() => setTheme('dark')}
            >
                <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
                {/* Dark */}
            </button>
            <button
                type="button"
                className={`items-center flex gap-x-2 py-2 px-3 bg-white/10 rounded-full text-sm text-white hover:bg-white/20 focus:outline-hidden focus:bg-white/20 cursor-pointer ${
                    theme === 'light' ? 'hidden' : ''
                }`}
                id="themeSwitcherLightButton"
                onClick={() => setTheme('light')}
            >
                <svg
                    className="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M12 2v2"></path>
                    <path d="M12 20v2"></path>
                    <path d="m4.93 4.93 1.41 1.41"></path>
                    <path d="m17.66 17.66 1.41 1.41"></path>
                    <path d="M2 12h2"></path>
                    <path d="M20 12h2"></path>
                    <path d="m6.34 17.66-1.41 1.41"></path>
                    <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
                {/* Light */}
            </button>
        </div>
    );
}
