import { ThemeSwitcher } from '@/component/shared/themeSwitcher';
import DuitRapiLogo from '@/component/logo/DuitRapiLogo';
import AuthLayoutCard from '@/component/page/auth/AuthLayoutComponent';
import { AuthLayoutProvider } from '@/context/auth/AuthLayoutContext';
import { getProfileInfo } from '@/utils/Tools';


export async function AuthLayout({ children }: { children: React.ReactNode }) {
    const { userName, isAdmin } = await getProfileInfo();

    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="absolute top-[0.5rem] right-[0.5rem] z-10">
                <ThemeSwitcher />
            </div>
            <div className="absolute top-[0.5rem] left-[0.5rem] z-10">
                <a href="/" className="flex items-center gap-x-2 text-neutral-500 dark:text-neutral-400 text-xl">
                    <DuitRapiLogo width={35} height={35} />
                    <span className="text-2xl ">
                        <span className="text-[#4E72FF]">Duit</span>
                        <span className="text-[#8EBDFF]">Rapi</span>
                    </span>
                </a>
            </div>
            <AuthLayoutProvider userName={userName} isAdmin={isAdmin} >
                <AuthLayoutCard>{children}</AuthLayoutCard>
            </AuthLayoutProvider>
        </div>
    );
}
