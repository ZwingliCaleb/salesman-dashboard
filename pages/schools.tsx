import React, { useEffect, useState } from "react";
import Invoices from "@/components/Invoices";
import Collections from "@/components/Collections";

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
    const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/schools");
                if (!response.ok) {
                    throw new Error("Failed to fetch schools data");
                }
                const data = await response.json();
                setSchools(data);
            } catch (err: any) {
                setError(err.message);
                console.error("Error fetching schools data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSchoolClick = (school: School) => {
        setSelectedSchool(school);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4 pl-48">
            <h1 className="text-2xl font-bold mb-4">Schools</h1>
            <div className="flex">
                <div className="w-1/4">
                    <ul>
                        {schools.map((school) => (
                            <li key={school.id} className="mb-2">
                                <button
                                    className="bg-teal-600 text-white py-2 px-4 rounded w-full text-left"
                                    onClick={() => handleSchoolClick(school)}
                                >
                                    {school.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-3/4 ml-4">
                    {selectedSchool && (
                        <div className="border p-6 rounded-md bg-gray-100">
                            <h2 className="text-xl font-bold mb-2">{selectedSchool.name}</h2>
                            <p>Type: {selectedSchool.type}</p>
                            <p>Product: {selectedSchool.product}</p>
                            <p>County: {selectedSchool.county}</p>
                            <p>Registration Date: {selectedSchool.registrationDate}</p>
                            <p>Contact Email: {selectedSchool.contactInfo.email}</p>
                            <p>Contact Phone: {selectedSchool.contactInfo.phone}</p>
                            <p>Balance: {selectedSchool.balance}</p>

                            <div className="mt-4">
                                <Invoices schoolId={selectedSchool.id} />
                            </div>
                            <div className="mt-4">
                                <Collections schoolId={selectedSchool.id} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SchoolsPage;
