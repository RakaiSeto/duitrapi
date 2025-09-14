    'use client';

    import { useAuthLayoutContext } from '@/context/auth/AuthLayoutContext';
    import { useEffect, useState } from 'react';
    import { useRouter } from 'next/navigation';

    // Define the shape of your form data
    interface FormData {
        fullname: string;
        email: string;
        password: string;
        confirmPassword: string;
    }

    // Define the shape of your validation errors
    type FormErrors = Partial<Record<keyof FormData, string>>;

    const validateForm = (data: FormData): FormErrors => {
        const errors: FormErrors = {};

        if (!data.fullname) {
            errors.fullname = 'Full name is required.';
        }
        
        // Email validation
        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Invalid email address.';
        }
        
        // Password validation
        if (!data.password) {
            errors.password = 'Password is required.';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        } else if (!/[!@#$%^&*(),.?":{}|<>_]/.test(data.password)) {
            errors.password = 'Password must contain at least one special character.';
        } else if (!/[A-Z]/.test(data.password)) {
            errors.password = 'Password must contain at least one uppercase letter.';
        } else if (!/[a-z]/.test(data.password)) {
            errors.password = 'Password must contain at least one lowercase letter.';
        } else if (!/[0-9]/.test(data.password)) {
            errors.password = 'Password must contain at least one number.';
        }

        // Confirm password validation
        if (data.password !== data.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        return errors;
    };

    export default function RegisterPage() {
        const router = useRouter();
        const { setMessage, setSubmessage } = useAuthLayoutContext();
        const [formData, setFormData] = useState<FormData>({
            fullname: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
        const [formErrors, setFormErrors] = useState<FormErrors>({});
        const [registerError, setRegisterError] = useState('');

        useEffect(() => {
            setMessage(<span className="text-3xl">New to <span className="text-[#4E72FF]">Duit</span><span className="text-[#8EBDFF]">Rapi</span>?</span>);
            setSubmessage(<span className="text-neutral-500 dark:text-neutral-400 text-sm">Let's get you started</span>);
        }, [setMessage, setSubmessage]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { id, value } = e.target;
            // The cast `as keyof FormData` is necessary here to ensure 'id' is a valid key
            // of our FormData type.
            setFormData(prev => ({ ...prev, [id as keyof FormData]: value }));
        };

        const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setRegisterError('');

            const errors = validateForm(formData);
            setFormErrors(errors);

            if (Object.keys(errors).length > 0) {
                return;
            }

            try {
                // Note: The body payload now includes only necessary data for the API.
                // confirmPassword should not be sent.
                const { fullname, email, password } = formData;
                const response = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fullname, email, password }),
                });

                if (response.ok) {
                    
                    router.push('/login');
                } else {
                    const errorData = await response.json();
                    if (errorData.error?.cause?.detail?.includes('already exists')) {
                        setRegisterError('Email already exists.');
                    } else {
                        setRegisterError('Internal server error.');
                    }
                }
            } catch (error) {
                console.error('Registration failed:', error);
                setRegisterError('An unexpected error occurred. Please try again.');
            }
        };

        return (
            <form onSubmit={handleRegister} className="flex flex-col gap-y-4 mt-[2rem] w-[75%]">
                {/* Full Name */}
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="fullname" className="text-neutral-500 dark:text-neutral-400 text-sm">Full Name</label>
                    <input type="text" id="fullname" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={formData.fullname} onChange={handleChange} />
                    {formErrors.fullname && <span className="text-red-500 text-sm">{formErrors.fullname}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="email" className="text-neutral-500 dark:text-neutral-400 text-sm">Email</label>
                    <input type="email" id="email" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={formData.email} onChange={handleChange} />
                    {formErrors.email && <span className="text-red-500 text-sm">{formErrors.email}</span>}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="password" className="text-neutral-500 dark:text-neutral-400 text-sm">Password</label>
                    <input type="password" id="password" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={formData.password} onChange={handleChange} />
                    {formErrors.password && <span className="text-red-500 text-sm">{formErrors.password}</span>}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-y-2 w-full">
                    <label htmlFor="confirmPassword" className="text-neutral-500 dark:text-neutral-400 text-sm">Confirm Password</label>
                    <input type="password" id="confirmPassword" className="w-full p-2 rounded-md border border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800" value={formData.confirmPassword} onChange={handleChange} />
                    {formErrors.confirmPassword && <span className="text-red-500 text-sm">{formErrors.confirmPassword}</span>}
                </div>

                <button type="submit" className="w-full p-2 rounded-md bg-gradient-to-r from-[#4E72FF] to-[#65A5FF] text-white dark:text-white cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">Register</button>
                {registerError && <span className="text-red-500 text-sm">{registerError}</span>}

                {/* Sign up */}
                <div className="flex justify-center">
                    <span className="text-neutral-500 dark:text-neutral-400 text-sm">Have an account already? <a href="/login" className="text-[#4E72FF] dark:text-[#65A5FF] cursor-pointer hover:underline">Login</a></span>
                </div>
            </form>
        );
    }