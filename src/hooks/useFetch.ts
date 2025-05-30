import axios from 'axios';
import { useEffect, useState } from 'react';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    total: number;
}
const useFetch = <T>(url: string, params: Record<string, any> = {}): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const searchParams = new URLSearchParams(params as any).toString();
                const response = await axios.get(`${url}?${searchParams}`);

                setData(response.data.data);
                setTotal(response.data.total);
            } catch (error: any) {
                setError(error.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(params)]); // stringify to track param changes

    return { data, loading, error, total };
};

export default useFetch;
