'use client';

import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
import { useRouter } from 'next/navigation';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AuthLayoutCard({ children }: { children: React.ReactNode }) {
    const { message, submessage } = useAuthLayoutContext();
    const router = useRouter();

    return (
        <div className="w-[60%] md:w-[40%] bg-white dark:bg-stone-950 rounded-lg shadow-md dark:shadow-nav-shadow flex flex-col items-center justify-center">
            <div className="w-full flex items-start p-2 mt-4 gap-x-2">
                <a
                    onClick={() => router.back()}
                    className="flex items-center gap-x-2 text-neutral-500 dark:text-white text-2xl cursor-pointer"
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </a>
                <div className="flex flex-col mt-[-0.2rem] gap-y-2">
                    {message && (
                        <span className="flex items-center gap-x-2 text-3xl">
                            {message}
                        </span>
                    )}
                    {submessage && (
                        <span className="flex items-center gap-x-2 text-neutral-500 dark:text-neutral-400 text-xl">
                            {submessage}
                        </span>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
