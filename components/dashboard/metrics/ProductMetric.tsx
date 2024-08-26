import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardMetric from "./DashboardMetric";
import { Package } from "@phosphor-icons/react";
import { getError } from "@/utils/getError";

export const ProductMetric = () => {
    const { data: session } = useSession();
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!session) return;
        const getCount = async () => {
            setLoading(true);
            axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products/count${session.user.role === 'Seller' ? `?created_by_user_id=${session.user.id}` : ''}`, {
                headers: {
                    'Authorization': `Bearer ${session.user.token}`
                }
            })
                .then(res => {
                    if (res.status !== 200) return;
                    const { data: productCount }: { data: number } = res.data;
                    setCount(productCount);
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
        <DashboardMetric icon={<Package />} count={count} text="Products" href="/dashboard/products" />
    )
};