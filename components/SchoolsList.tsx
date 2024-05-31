import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

const SchoolsList: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/schools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools data');
        }
        const data: School[] = await response.json();
        setSchools(data);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching schools data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Schools</h1>
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            <Link href={`/schools/${school.id}`}>
              <a>
                {school.name} - {school.type}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolsList;
