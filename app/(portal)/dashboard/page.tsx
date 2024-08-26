'use client'

import Card from "@/components/Card";
import LabelDateTime from "@/components/LabelDateTime";
import PageHeader from "@/components/dashboard/PageHeader";
import { Table, TableBody, TableHead } from "@/components/dashboard/Table";
import { InvoiceMetric } from "@/components/dashboard/metrics/InvoiceMetric";
import { MessageMetric } from "@/components/dashboard/metrics/MessageMetric";
import { MyProductRequestMetric } from "@/components/dashboard/metrics/MyProductRequestMetric";
import { ProductMetric } from "@/components/dashboard/metrics/ProductMetric";
import { ProductRequestMetric } from "@/components/dashboard/metrics/ProductRequestMetric";
import { UserMetric } from "@/components/dashboard/metrics/UserMetric";
import { UserType, UserTypes } from "@/types/UserTypes";
import { UserDto } from "@/types/objects/UserDto";
import { getError } from "@/utils/getError";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";

const DASHBOARD_METRIC_USER_TYPES_MAPPING: Record<UserType, ReactNode> = {
    Admin: <>
        <UserMetric />
        <ProductRequestMetric />
        <ProductMetric />
        <MessageMetric />
    </>,
    Seller: <>
        <MyProductRequestMetric />
        <ProductRequestMetric />
        <ProductMetric />
        <MessageMetric />
    </>,
    Buyer: <>
        <MyProductRequestMetric />
        <InvoiceMetric />
        <MessageMetric />
    </>
}

const Dashboard = () => {
    const { data: session } = useSession();
    const [activeUsers, setActiveUsers] = useState<UserDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!session) return;
        const getUsers = () => {
            setLoading(true);
            axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/users/getAllActive`, {
                headers: {
                    'Authorization': `Bearer ${session.user.token}`
                }
            })
                .then(res => {
                    if (res.status !== 200) return;
                    const { data: users }: { data: UserDto[] } = res.data;
                    setActiveUsers(users);
                })
                .catch((err: AxiosError) => {
                    const errorMessage = getError(err);
                    setError(errorMessage);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        getUsers();
    }, [session]);

    if (!session) return;

    const dashboardMetricsEl = DASHBOARD_METRIC_USER_TYPES_MAPPING[session.user.role as UserType];

    return (
        <>
            <PageHeader text="Dashboard" />
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: session.user.role === 'Buyer' ? 'repeat(3, minmax(0, 1fr))' : 'repeat(4, minmax(0, 1fr))' }}>
                {dashboardMetricsEl}
            </div>
            {
                session.user.role === 'Admin' ? <Card className="w-full">
                    <Card.Title>
                        Active Users
                    </Card.Title>
                    <Table>
                        <TableHead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Email</th>
                                <th>Created Date</th>
                            </tr>
                        </TableHead>
                        <TableBody loading={loading} errorMessage={error} >
                            {
                                activeUsers && activeUsers.map(item => {
                                    return (
                                        <tr key={item.id}>
                                            <td><Link href={"/dashboard/users/" + item.id} className="default-link" >{item.firstname} {item.lastname}</Link></td>
                                            <td>{UserTypes[item.user_type_id]}</td>
                                            <td>{item.email}</td>
                                            <td className="!text-start"><LabelDateTime value={item.created_date} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </Card>: ''
            }
        </>
    )
}

export default Dashboard