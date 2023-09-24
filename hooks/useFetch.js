import { useEffect, useState } from "react";

const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            setError(err.message);
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