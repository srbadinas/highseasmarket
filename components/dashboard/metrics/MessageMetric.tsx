import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardMetric from "./DashboardMetric";
import { Envelope } from "@phosphor-icons/react";

export const MessageMetric = () => {
    const { data: session } = useSession();
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>(undefined);

    useEffect(() => {
        if (!session) return;
        // const getCount = async () => {
        //     setLoading(true);
        //     axios(`${process.env.NEXT_PUBLIC_BASE_URI}/api/products/count`, {
        //         headers: {
        //             'Authorization': `Bearer ${session.user.token}`
        //         }
        //     })
        //         .then(res => {
        //             if (res.status !== 200) return;
        //             const { data: productCount }: { data: number } = res.data;
        //             setCount(productCount);
        //         })
        //         .catch(err => {
        //             if (err instanceof Error) {
        //                 setError(err);
        //             }

        //             console.error(err);
        //         })
        //         .finally(() => {
        //             setLoading(false);
        //         });
        // };

        // getCount();
    }, [session]);

    return (
        <DashboardMetric icon={<Envelope />} color="bg-gray-500" count={count} text="Messages" />
    )
};