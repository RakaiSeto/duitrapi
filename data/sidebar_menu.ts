import { SidebarMenuData } from '@/models/sidebarMenu';

// Using font-awesome icon names directly
export const SIDEBAR_MENU: SidebarMenuData = {
  admin: [
    {
      icon: "fa-home",
      display: "Dashboard",
      href: "/admin"
    },
    {
      icon: "fa-user-group",
      display: "Users",
      href: "/admin/users"
    },
    {
      icon: "fa-object-group",
      display: "Categories",
      href: "/admin/categories"
    }
  ],
  user: [
    {
      icon: "fa-home",
      display: "Dashboard",
      href: "/user"
    },
    {
      icon: "fa-object-group",
      display: "Categories",
      href: "/user/categories"
    },
    {
      icon: "fa-wallet",
      display: "Wallets",
      href: "/user/wallets"
    },
    {
      icon: "fa-receipt",
      display: "Transactions",
      href: "/user/transactions"
    },
    {
      icon: "fa-chart-simple",
      display: "Statistics",
      href: "/user/statistics"
    }
  ]
};