// Defines the shape of a single menu item
export interface SidebarMenuItem {
    icon: string;
    display: string;
    href: string;
}

// Defines the shape of the overall sidebar menu data
export interface SidebarMenuData {
    admin: SidebarMenuItem[];
    user: SidebarMenuItem[];
}
