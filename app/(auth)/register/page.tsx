'use client';

import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
import { useEffect } from 'react';

export default function LoginPage() {
    const { setMessage, setSubmessage } = useAuthLayoutContext();

    useEffect(() => {
        setMessage(<span className="text-3xl">New to <span className="text-[#4E72FF]">Duit</span><span className="text-[#8EBDFF]">Rapi</span>?</span>);
        setSubmessage(<span className="text-neutral-500 dark:text-neutral-400 text-sm">Let's get you started</span>);
    }, []);

    return (
        <div className="flex flex-col gap-y-4 mt-[2rem] w-[75%]">
            {/* full name */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="fullName" className="text-neutral-500 dark:text-neutral-400 text-sm">Full Name</label>
                <input type="text" id="fullName" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" />
            </div>

            {/* email */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email" className="text-neutral-500 dark:text-neutral-400 text-sm">Email</label>
                <input type="email" id="email" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" />
                <span className="text-red-500 dark:text-red-400 text-sm hidden">Invalid email address</span>
            </div>

            {/* password */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password" className="text-neutral-500 dark:text-neutral-400 text-sm">Password</label>
                <input type="password" id="password" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" />
                <span className="text-red-500 dark:text-red-400 text-sm hidden">Password must be at least 8 characters long</span>
            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="confirmPassword" className="text-neutral-500 dark:text-neutral-400 text-sm">Confirm Password</label>
                <input type="password" id="confirmPassword" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" />
                <span className="text-red-500 dark:text-red-400 text-sm hidden">Passwords do not match</span>
            </div>

            {/* register button (no div) */}
            <button className="w-full p-2 rounded-md bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] text-white dark:text-white cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">Register</button>

            {/* sign up */}
            <div className="flex justify-center">
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">Have an account already? <a href="/login" className="text-[#4E72FF] dark:text-[#65A5FF] cursor-pointer hover:underline">Login</a></span>
            </div>
        </div>
    );
}