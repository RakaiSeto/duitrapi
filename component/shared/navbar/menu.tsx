import { NAVBAR_MENU } from "@/data/navbar_menu";

export function NavbarMenu() {
    return (
        <ul className="flex justify-evenly gap-[1rem] items-center w-[50%] mx-auto">
            {NAVBAR_MENU.default.map((item, index) => (
                <a key={index} href={item.href}>{item.display}</a>
            ))}
        </ul>
    );
}