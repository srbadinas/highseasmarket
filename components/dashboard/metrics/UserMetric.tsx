import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardMetric from "./DashboardMetric";
import { User } from "@phosphor-icons/react";
import { getError } from "@/utils/getError";

export const UserMetric = () => {
    const { data: session } = useSession();
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (!session) return;
        const getCount = async () => {
            setLoading(true);
            axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/users/count`, {
                headers: {
                    'Authorization': `Bearer ${session.user.token}`
                }
            })
                .then(res => {
                    if (res.status !== 200) return;
                    const { data: usersCount }: { data: number } = res.data;
                    setCount(usersCount);
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
        <DashboardMetric icon={<User />} color="bg-blue-600" count={count} text="Users" href="/dashboard/users" />
    )
};