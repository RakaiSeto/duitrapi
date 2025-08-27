import DuitRapiLogo from '@/component/logo/DuitRapiLogo';
import { NavbarMenu } from './menu';
import { ThemeSwitcher } from '../themeSwitcher';
import UserButton from './userButton';
import { cookies } from 'next/headers';
import { getUserFromJwt } from '@/utils/Session';

export async function Navbar() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value; // Get the token directly on the server
    let userName = null;
    let isAdmin = false;
    let isLoggedIn = false;
    if (token) {
        const payload = await getUserFromJwt(token); // Decrypt the token

        userName = payload ? (payload.fullName as string) : null; // Get the user's name from the payload
        isAdmin = payload ? (payload.admin as boolean) : false;
        isLoggedIn = payload ? ((payload.exp && payload.exp > Date.now()) as boolean) : false;
    }

    return (
        <div
            className={`navbar fixed top-0 mx-auto left-[50%] translate-x-[-50%] p-[0.6rem] flex justify-center w-[60%] mx-auto rounded-b-[1rem] shadow-nav-shadow shadow-md backdrop-blur-md`}
        >
            <div className="flex items-center gap-[0.5rem]">
                <DuitRapiLogo width={40} height={40} />
                <span className="text-2xl ">
                    <span className="text-[#4E72FF]">Duit</span>
                    <span className="text-[#8EBDFF]">Rapi</span>
                </span>
            </div>
            <div className="flex-5 flex items-center">
                <NavbarMenu />
            </div>
            <div className="flex justify-end gap-x-2 items-center me-2">
                <UserButton userName={userName} isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
                <ThemeSwitcher />
            </div>
        </div>
    );
}
