'use client';

import DuitRapiLogo from "@/component/logo/DuitRapiLogo";
import { NavbarMenu } from "./menu";
import { ThemeSwitcher } from "../themeSwitcher";

export function Navbar() {
    return (
        <div className={`navbar fixed top-0 mx-auto left-[50%] translate-x-[-50%] p-[0.6rem] flex justify-center w-[50%] mx-auto rounded-b-[1rem] shadow-nav-shadow shadow-md backdrop-blur-md`}>
            <div className="flex items-center gap-[0.5rem]">
                <DuitRapiLogo width={40} height={40}/>
                <span className="text-2xl ">
                    <span className="text-[#4E72FF]">Duit</span><span className="text-[#8EBDFF]">Rapi</span>
                </span>
            </div>
            <div className="flex-4 flex items-center">
                <NavbarMenu />
            </div>
            <div className="flex-1 flex justify-end items-center">
                <ThemeSwitcher />
            </div>
        </div>
    );
}