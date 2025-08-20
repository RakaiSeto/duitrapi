'use client';

import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
import router from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
    const { setMessage, setSubmessage } = useAuthLayoutContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(() => {
        setMessage(
            <span className="text-3xl">
                Welcome Back to <span className="text-[#4E72FF]">Duit</span>
                <span className="text-[#8EBDFF]">Rapi</span>!
            </span>
        );
        setSubmessage(<span className="text-neutral-500 dark:text-neutral-400 text-sm">Login to your account to continue</span>);
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            setEmailError('Email is required');
            setPasswordError('Password is required');
            return;
        }

        // check if email is valid
        if (!email.includes('@')) {
            setPasswordError('');
            setEmailError('Invalid email');
            return;
        }
        // check if password is valid
        if (password.length < 8) {
            setEmailError('');
            setPasswordError('Password must be at least 8 characters');
            return;
        }

        setEmailError('');
        setPasswordError('');

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            // save token to cookie
            document.cookie = `token=${data.token}; path=/`;
            // redirect to home
            router.redirect('/');
        } else {
            if (data.type === 'email') {
                setEmailError(data.message);
                setPasswordError('');
            } else if (data.type === 'password') {
                setPasswordError(data.message);
                setEmailError('');
            }
        }
    };

    return (
        <div className="flex flex-col gap-y-4 mt-[2rem] w-[75%]">
            {/* email */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email" className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span className="text-red-500 dark:text-red-400 text-sm">{emailError}</span>
            </div>

            {/* password */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password" className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span className="text-red-500 dark:text-red-400 text-sm">{passwordError}</span>
            </div>

            {/* forgot password */}
            <div className="flex justify-end">
                <a href="/forgot-password" className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Forgot Password?
                </a>
            </div>

            {/* login button (no div) */}
            <button className="w-full p-2 rounded-md bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] text-white dark:text-white cursor-pointer hover:scale-105 transition-all ease-in-out duration-300" onClick={handleLogin}>
                Login
            </button>

            {/* sign up */}
            <div className="flex justify-center">
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Don't have an account?{' '}
                    <a href="/register" className="text-[#4E72FF] dark:text-[#65A5FF] cursor-pointer hover:underline">
                        Sign up
                    </a>
                </span>
            </div>
        </div>
    );
}
