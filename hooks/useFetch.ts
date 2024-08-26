import { useEffect, useState } from "react";



const useFetch = (url: string, options?: RequestInit) => {
    const [data, setData] = useState<object | object[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (url) {
            fetchData();
        }

        return () => {
            setData(null);
        };
    }, [url]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                next: {
                    revalidate: 10
                },
                ...options,
            });

            if (!res.ok) {
                console.log(res);
                throw new Error('Something went wrong');
            }

            const result = await res.json();
            setData(result);

        } catch (err) {
            if (err instanceof Error) {
                setError(err);
            }

            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const refetch = () => {
        if (url) {
            fetchData();
        }
    }

    return { data, loading, error, refetch };
}

export default useFetch