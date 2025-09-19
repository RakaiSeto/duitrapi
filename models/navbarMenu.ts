// Defines the shape of a single menu item
export interface NavbarMenuItem {
    display: string;
    href: string;
}

// Defines the shape of the overall sidebar menu data
export interface NavbarMenuData {
    default: NavbarMenuItem[];
}
