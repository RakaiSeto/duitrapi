import DashboardLayoutComponent from '@/component/page/dashboard/DashboardLayoutComponent';
import { DashboardLayoutProvider } from '@/context/auth/DashboardLayoutContext';
import { getProfileInfo } from '@/utils/Tools';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const { userName, isAdmin } = await getProfileInfo();

    return (
        <DashboardLayoutProvider userName={userName} isAdmin={isAdmin}>
            <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
        </DashboardLayoutProvider>
    );
}
