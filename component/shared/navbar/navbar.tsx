import DuitRapiLogo from '@/component/logo/DuitRapiLogo';
import { NavbarMenu } from './menu';
import { ThemeSwitcher } from '../themeSwitcher';
import UserButton from './userButton';
import { getProfileInfo } from '@/utils/Tools';

export async function Navbar() {
    const { userName, isAdmin, isLoggedIn } = await getProfileInfo();

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
