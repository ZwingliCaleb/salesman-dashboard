
import React, { useEffect, useState } from "react";

interface TopCardProps {
    title: string;
    endpoint: string;
    nestedKey ?: string;
}

const TopCard: React.FC<TopCardProps> = ({ title, endpoint, nestedKey }) => {
    const [value, setValue] = useState<number | string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3001/${endpoint}`);
                if (!response.ok) {
                    throw new Error(`Error fetching data from ${endpoint}: ${response.statusText}`);
                }
                const data = await response.json();
                setValue(nestedKey ? data[nestedKey] : data);
            } catch (err) {
                setError(err.message);
                console.error(`Error fetching data from ${endpoint}:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, nestedKey]);

    return (
        <div className="bg-white p-4 shadow-md">
            <h3 className="text-lg font-semibold">{title}</h3>
            {loading ? (
                <p className="text-2xl">Loading...</p>
            ) : error ? (
                <p className="text-red-500">Error: {error}</p>
            ) : (
                <p className="text-2xl">{value}</p>
            )}
        </div>
    );
};

export default TopCard;
