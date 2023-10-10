'use client'

import Card from "@components/Card";
import LabelDateTime from "@components/LabelDateTime";
import Loader from "@components/Loader";
import SectionHeader from "@components/SectionHeader";
import DashboardCount from "@components/dashboard/DashboardCount";
import PageHeader from "@components/dashboard/PageHeader";
import Table from "@components/dashboard/Table";
import useFetch from "@hooks/useFetch";
import generateUniqueId from "@utils/uniqueId";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const { data: users, loading: usersLoading, error: usersError } = useFetch('/api/dashboard/users/getAllActive');

    return (
        <>
            <PageHeader text="Dashboard" />
            {
                status == 'loading' ? <Loader className="!w-[80px]" /> :
                    <DashboardContainer userId={session.user.id} userRoleId={session.user.user_role_id} />
            }
            <Card className="w-full">
                <Card.Title>
                    Active Users
                </Card.Title>
                <Table>
                    <Table.Head>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Email</th>
                            <th>Created at</th>
                        </tr>
                    </Table.Head>
                    <Table.Body loading={usersLoading} error={usersError} >
                        {
                            users && users.map(item => {
                                return <tr key={generateUniqueId(item.id)}>
                                    <td><Link href={"/dashboard/users/" + item.id} className="default-link" >{item.firstname} {item.lastname}</Link></td>
                                    <td>{item.user_role}</td>
                                    <td>{item.email}</td>
                                    <td className="!text-start"><LabelDateTime datetime={item.created_at} /></td>
                                </tr>
                            })
                        }
                    </Table.Body>
                </Table>
            </Card>
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
        <div className="flex flex-wrap gap-y-4 justify-between mb-4">
            <DashboardCount icon="fa-users" bgColor="bg-blue-600" count={dashboardCount.users_count} text="Users" href="/dashboard/users" />
            <DashboardCount icon="fa-file-contract" bgColor="bg-amber-500" count={dashboardCount.product_requests_count} text="Product Requests" href="/dashboard/productrequests" />
            <DashboardCount icon="fa-box" count={dashboardCount.products_count} text="Products" href="/dashboard/products" />
            <DashboardCount icon="fa-envelope" bgColor="bg-gray-500" count={dashboardCount.messages_count} text="Messages" />
        </div>
    </>
}

const SellerDashboard = ({ dashboardCount }) => {
    return <>
        <div className="flex flex-wrap gap-y-4 justify-between mb-4">
            <DashboardCount icon="fa-file-invoice" bgColor="bg-blue-600" count={dashboardCount.my_product_requests_count} text="My Requests" href="/dashboard/productrequests" />
            <DashboardCount icon="fa-file-contract" bgColor="bg-amber-500" count={dashboardCount.product_requests_count} text="Product Requests" href="/dashboard/productrequests" />
            <DashboardCount icon="fa-box" count={dashboardCount.products_count} text="Products" href="/dashboard/products" />
            <DashboardCount icon="fa-envelope" bgColor="bg-gray-500" count={dashboardCount.messages_count} text="Messages" />
        </div>
    </>
}

const BuyerDashboard = ({ dashboardCount }) => {
    return <>
        <div className="flex flex-wrap gap-y-4 justify-between mb-4">
            <DashboardCount className="lg:!w-[32%]" icon="fa-file-invoice" bgColor="bg-blue-600" count={dashboardCount.my_product_requests_count} text="My Requests" href="/dashboard/productrequests" />
            <DashboardCount className="lg:!w-[32%]" icon="fa-file-invoice-dollar" count={dashboardCount.invoices_count} text="Invoices" href="/dashboard/invoices" />
            <DashboardCount className="sm:!w-full lg:!w-[32%]" icon="fa-envelope" bgColor="bg-gray-500" count={dashboardCount.messages_count} text="Messages" />
        </div>
    </>
}

export default Dashboard