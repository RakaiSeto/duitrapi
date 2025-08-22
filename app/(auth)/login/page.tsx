'use client';

import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface FormData {
    email: string;
    password: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const validateForm = (data: FormData): FormErrors => {
    const errors: FormErrors = {};
    if (!data.email) {
        errors.email = 'Email is required';
    } else if (!data.email.includes('@')) {
        errors.email = 'Invalid email';
    }

    if (!data.password) {
        errors.password = 'Password is required';
    } else if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    return errors;
};

export default function LoginPage() {
    const router = useRouter();

    const { setMessage, setSubmessage } = useAuthLayoutContext();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        setMessage(
            <span className="text-3xl">
                Welcome Back to <span className="text-[#4E72FF]">Duit</span>
                <span className="text-[#8EBDFF]">Rapi</span>!
            </span>
        );
        setSubmessage(<span className="text-neutral-500 dark:text-neutral-400 text-sm">Login to your account to continue</span>);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        // The cast `as keyof FormData` is necessary here to ensure 'id' is a valid key
        // of our FormData type.
        setFormData((prev) => ({ ...prev, [id as keyof FormData]: value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginError('');

        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        try {
            const { email, password } = formData;
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                if (data.admin) {
                    router.push('/admin');
                } else {
                    router.push('/dashboard');
                }
            } else {
                setLoginError(data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <form id="login-form" className="flex flex-col gap-y-4 mt-[2rem] w-[75%]" onSubmit={handleLogin}>
            {/* email */}
            <div className="flex flex-col gap-y-2 w-full">
                <label htmlFor="email" className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800"
                    value={formData.email}
                    onChange={handleChange}
                />
                <span className="text-red-500 dark:text-red-400 text-sm">{formErrors.email}</span>
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
                    value={formData.password}
                    onChange={handleChange}
                />
                <span className="text-red-500 dark:text-red-400 text-sm">{formErrors.password}</span>
            </div>

            {/* forgot password */}
            <div className="flex justify-end">
                <a href="/forgot-password" className="text-neutral-500 dark:text-neutral-400 text-sm">
                    Forgot Password?
                </a>
            </div>

            {/* login button (no div) */}
            <button
                className="w-full p-2 rounded-md bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] text-white dark:text-white cursor-pointer hover:scale-105 transition-all ease-in-out duration-300"
                type="submit"
                form="login-form"
            >
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
        </form>
    );
}
