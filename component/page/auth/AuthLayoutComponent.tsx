'use client';

import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
import { useRouter } from 'next/navigation';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AuthLayoutCard({ children }: { children: React.ReactNode }) {
    const { message, submessage } = useAuthLayoutContext();
    const router = useRouter();

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full h-full lg:w-[45%] bg-white dark:bg-stone-950 flex items-center justify-center">
                <div className="w-full justify-start flex items-start ms-4">
                    {/* back button (must be same height as title) */}
                    <div className="justify-start flex items-start pt-[0.1rem] me-4">
                        <a
                            onClick={() => router.back()}
                            className="flex items-center gap-x-2 text-neutral-500 dark:text-white text-2xl cursor-pointer"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </a>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="flex flex-col mt-[-0.2rem] gap-y-2">
                            {message && message}
                            {submessage && submessage}
                        </div>
                        {children}
                    </div>
                </div>
            </div>

            {/* mockup */}
            <div className="w-0 lg:w-[55%]"></div>
        </div>
    );
}
