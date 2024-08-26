import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardMetric from "./DashboardMetric";
import { Article, Table } from "@phosphor-icons/react";
import { getError } from "@/utils/getError";

export const MyProductRequestMetric = () => {
    const { data: session } = useSession();
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!session) return;
        const getCount = async () => {
            setLoading(true);
            axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/productRequests/count?requested_by_user_id=${session.user.id}`, {
                headers: {
                    'Authorization': `Bearer ${session.user.token}`
                }
            })
                .then(res => {
                    if (res.status !== 200) return;
                    const { data: productRequestCount }: { data: number } = res.data;
                    setCount(productRequestCount);
                })
                .catch(err => {
                    const errorMessage = getError(err);
                    setError(errorMessage);
                })
                .finally(() => {
                    setLoading(false);
                });
        };

        getCount();
    }, [session]);

    return (
        <DashboardMetric icon={<Table />} color="bg-yellow-300" count={count} text="My Product Requests" href="/dashboard/productrequests" />
    )
};