import menuData from "@/data/navbar_menu.json";

export function NavbarMenu() {
    return (
        <ul className="flex justify-evenly gap-[1rem] items-center w-[50%] mx-auto">
            {menuData.default.map((item, index) => (
                <a key={index} href={item.href}>{item.display}</a>
            ))}
        </ul>
    );
}