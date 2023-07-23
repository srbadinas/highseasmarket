'use client'

import Loader from "@components/Loader";
import DashboardCount from "@components/dashboard/DashboardCount";
import PageHeader from "@components/dashboard/PageHeader";
import useFetch from "@hooks/useFetch";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Dashboard = () => {
    const { data: session, status } = useSession();
    return (
        <>
            <PageHeader text="Dashboard" />
            {
                !session ? <Loader className="!w-[80px]" /> :
                    <DashboardContainer userId={session.user.id} userRoleId={session.user.user_role_id} />
            }

        </>
    )
}

const DashboardContainer = ({ userId, userRoleId }) => {
    const { data: dashboardCount, loading: dashboardCountLoading, error: dashboardCountError } = useFetch('/api/dashboard?user_id=' + userId);

    if (dashboardCount) {
        switch (userRoleId) {
            case 1:
                return <AdminDashboard dashboardCount={dashboardCount} />;
            case 2:
                return <SellerDashboard dashboardCount={dashboardCount} />;
            case 3:
                return <BuyerDashboard dashboardCount={dashboardCount} />;
            default:
                return <Loader className="!w-[80px]" />
        }
    }


}

const AdminDashboard = ({ dashboardCount }) => {
    return <>
        <div className="flex flex-wrap gap-y-4 justify-between">
            <DashboardCount icon="fa-users" bgColor="bg-blue-600" count={dashboardCount.users_count} text="Users" href="/dashboard/users" />
            <DashboardCount icon="fa-file-contract" bgColor="bg-amber-500" count={dashboardCount.product_requests_count} text="Product Requests" href="/dashboard/productrequests" />
            <DashboardCount icon="fa-box" count={dashboardCount.products_count} text="Products" href="/dashboard/products" />
            <DashboardCount icon="fa-envelope" bgColor="bg-gray-500" count={dashboardCount.messages_count} text="Messages" />
        </div>
    </>
}

const SellerDashboard = ({ dashboardCount }) => {
    return <>
        <div className="flex flex-wrap gap-y-4 justify-between">
            <DashboardCount icon="fa-file-invoice" bgColor="bg-blue-600" count={dashboardCount.my_product_requests_count} text="My Requests" href="/dashboard/productrequests" />
            <DashboardCount icon="fa-file-contract" bgColor="bg-amber-500" count={dashboardCount.product_requests_count} text="Product Requests" href="/dashboard/productrequests" />
            <DashboardCount icon="fa-box" count={dashboardCount.products_count} text="Products" href="/dashboard/products" />
            <DashboardCount icon="fa-envelope" bgColor="bg-gray-500" count={dashboardCount.messages_count} text="Messages" />
        </div>
    </>
}

const BuyerDashboard = ({ dashboardCount }) => {
    return <>
        <div className="flex flex-wrap gap-y-4 justify-between">
            <DashboardCount className="lg:!w-[32%]" icon="fa-file-invoice" bgColor="bg-blue-600" count={dashboardCount.my_product_requests_count} text="My Requests" href="/dashboard/productrequests" />
            <DashboardCount className="lg:!w-[32%]" icon="fa-file-invoice-dollar" count={dashboardCount.invoices_count} text="Invoices" href="/dashboard/invoices" />
            <DashboardCount className="sm:!w-full lg:!w-[32%]" icon="fa-envelope" bgColor="bg-gray-500" count={dashboardCount.messages_count} text="Messages" />
        </div>
    </>
}

export default Dashboard