'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faCaretDown } from '@fortawesome/free-solid-svg-icons';

// This is a more robust dropdown component that handles its own open/close state.
// For simplicity, we'll keep the design within the component, but in a real app,
// the dropdown content might be its own separate component.
import { useState } from 'react';

export default function UserButton({
    userName,
    isAdmin,
    isLoggedIn,
}: {
    userName: string | null;
    isAdmin: boolean;
    isLoggedIn: boolean;
}) {
    // Assumption: isAdmin is not used in the UI, so it is unnecessary to include it as a prop.
    // Let's remove it to simplify the component.

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (!isLoggedIn) {
        return (
            <a
                href="/login"
                className="inline-flex items-center gap-x-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors
                bg-[#616c89] hover:bg-[#525a74] dark:bg-white/10 dark:hover:bg-white/20"
            >
                Login <FontAwesomeIcon icon={faRightToBracket} />
            </a>
        );
    }

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors
                bg-[#616c89] hover:bg-[#525a74] dark:bg-white/10 dark:hover:bg-white/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
            >
                {userName}
                <FontAwesomeIcon icon={faCaretDown} className="size-3 -mr-1 text-white" />
            </button>

            {/* This is a much cleaner and semantically correct way to handle a dropdown */}
            {isMenuOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
                    bg-[#bac0d3] dark:bg-[#1c2436]"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1">
                        <a
                            href={isAdmin ? '/admin' : '/dashboard'}
                            className="block px-4 py-2 text-sm text-white transition-colors hover:bg-[#616c89] dark:hover:bg-white/20"
                            role="menuitem"
                            tabIndex={-1}
                        >
                            Dashboard
                        </a>    
                        <a
                            href="/logout"
                            className="block px-4 py-2 text-sm text-white transition-colors hover:bg-[#616c89] dark:hover:bg-white/20"
                            role="menuitem"
                            tabIndex={-1}
                        >
                            Logout <FontAwesomeIcon icon={faRightToBracket} />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
