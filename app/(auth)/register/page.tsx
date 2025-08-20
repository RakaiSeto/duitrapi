'use client';

import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const { setMessage, setSubmessage } = useAuthLayoutContext();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [registerError, setRegisterError] = useState('');
    // when password and confirm password are not the same, show the error
    useEffect(() => {
        if (password.length === 0) {
            setPasswordError('');
            setConfirmPasswordError('');
        } else if (password.length < 8 ) {
            setPasswordError('Password must be at least 8 characters long');
        } else if (!/[!@#$%^&*(),.?":{}|<>_]/g.test(password)) {
            setPasswordError('Password must contain at least one special character');
        } else if (!/[A-Z]/.test(password)) {
            setPasswordError('Password must contain at least one uppercase letter');
        } else if (!/[a-z]/.test(password)) {
            setPasswordError('Password must contain at least one lowercase letter');
        } else if (!/[0-9]/.test(password)) {
            setPasswordError('Password must contain at least one number');
        } else if (password !== confirmPassword) {
            setPasswordError('');
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
            setPasswordError('');
        }
    }, [password, confirmPassword]);

    useEffect(() => {
        if (email.length === 0) {
            setEmailError('');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    }, [email]);

    useEffect(() => {
        setMessage(<span className="text-3xl">New to <span className="text-[#4E72FF]">Duit</span><span className="text-[#8EBDFF]">Rapi</span>?</span>);
        setSubmessage(<span className="text-neutral-500 dark:text-neutral-400 text-sm">Let's get you started</span>);
    }, []);

    const handleRegister = async () => {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ fullname, email, password }),
        });
        if (response.ok) {
            router.push('/login');
        } else {
            const error = await response.json();
            if (error.error.cause.detail.includes('already exists')) {
                setRegisterError('Email already exists');
            } else {
                setRegisterError('Internal server error');
            }
        }
    };

    return (
        <div className="flex flex-col gap-y-4 mt-[2rem] w-[75%]">
            {/* full name */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="fullName" className="text-neutral-500 dark:text-neutral-400 text-sm">Full Name</label>
                <input type="text" id="fullName" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={fullname} onChange={(e) => setFullname(e.target.value)} />
            </div>

            {/* email */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email" className="text-neutral-500 dark:text-neutral-400 text-sm">Email</label>
                <input type="email" id="email" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className="text-red-500 dark:text-red-400 text-sm">{emailError}</span>
            </div>

            {/* password */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="password" className="text-neutral-500 dark:text-neutral-400 text-sm">Password</label>
                <input type="password" id="password" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="text-red-500 dark:text-red-400 text-sm">{passwordError}</span>
            </div>

            {/* confirm password */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="confirmPassword" className="text-neutral-500 dark:text-neutral-400 text-sm">Confirm Password</label>
                <input type="password" id="confirmPassword" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className="text-red-500 dark:text-red-400 text-sm">{confirmPasswordError}</span>
            </div>

            {/* register button (no div) */}
            <button className="w-full p-2 rounded-md bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] text-white dark:text-white cursor-pointer hover:scale-105 transition-all ease-in-out duration-300" onClick={handleRegister}>Register</button>
            <span className="text-red-500 dark:text-red-400 text-sm">{registerError}</span>

            {/* sign up */}
            <div className="flex justify-center">
                <span className="text-neutral-500 dark:text-neutral-400 text-sm">Have an account already? <a href="/login" className="text-[#4E72FF] dark:text-[#65A5FF] cursor-pointer hover:underline">Login</a></span>
            </div>
        </div>
    );
}