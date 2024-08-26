import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardMetric from "./DashboardMetric";
import { Article } from "@phosphor-icons/react";
import { getError } from "@/utils/getError";

export const ProductRequestMetric = () => {
    const { data: session } = useSession();
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!session) return;
        const getCount = async () => {
            setLoading(true);
            axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/productRequests/count${session.user.role === 'Seller' ? `?requested_to_user_id=${session.user.id}` : ''}`, {
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
        <DashboardMetric icon={<Article />} color="bg-amber-500" count={count} text="Product Requests" href="/dashboard/productrequests" />
    )
};