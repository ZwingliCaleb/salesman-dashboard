import Sidebar from "@/components/Sidebar";
import React, { useEffect, useState } from "react";

interface School {
    id: number;
    name: string;
    type: string;
    product: string;
    county: string;
    registrationDate: string;
    contactInfo: {
        email: string;
        phone: string;
    };
    balance: number;
}

const SchoolsPage: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/schools");
                if (!response.ok) {
                    throw new Error("Failed to fetch schools data");
                }
                const data = await response.json();
                setSchools(data);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching schools data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4 ">  
            <h1 className="text-2xl font-bold mb-4">Schools</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Type</th>
                        <th className="py-2 px-4 border-b">Product</th>
                        <th className="py-2 px-4 border-b">County</th>
                        <th className="py-2 px-4 border-b">Registration Date</th>
                        <th className="py-2 px-4 border-b">Contact Email</th>
                        <th className="py-2 px-4 border-b">Contact Phone</th>
                        <th className="py-2 px-4 border-b">Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {schools.map((school) => (
                        <tr key={school.id}>
                            <td className="py-2 px-4 border-b">{school.name}</td>
                            <td className="py-2 px-4 border-b">{school.type}</td>
                            <td className="py-2 px-4 border-b">{school.product}</td>
                            <td className="py-2 px-4 border-b">{school.county}</td>
                            <td className="py-2 px-4 border-b">{school.registrationDate}</td>
                            <td className="py-2 px-4 border-b">{school.contactInfo.email}</td>
                            <td className="py-2 px-4 border-b">{school.contactInfo.phone}</td>
                            <td className="py-2 px-4 border-b">{school.balance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SchoolsPage;
