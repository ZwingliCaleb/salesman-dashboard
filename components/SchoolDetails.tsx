import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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

interface Invoice {
  id: number;
  // Add properties for invoice details
}

interface Collection {
  id: number;
  // Add properties for collection details
}

const SchoolDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [school, setSchool] = useState<School | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchSchoolData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/schools/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch school data');
          }
          const schoolData: School = await response.json();
          setSchool(schoolData);
        } catch (err: any) {
          setError(err.message);
          console.error('Error fetching school data:', err);
        }
      };

      const fetchInvoices = async () => {
        try {
          const response = await fetch(`http://localhost:3001/invoices?schoolId=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch invoices data');
          }
          const invoicesData: Invoice[] = await response.json();
          setInvoices(invoicesData);
        } catch (err: any) {
          setError(err.message);
          console.error('Error fetching invoices data:', err);
        }
      };

      const fetchCollections = async () => {
        try {
          const response = await fetch(`http://localhost:3001/collections?schoolId=${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch collections data');
          }
          const collectionsData: Collection[] = await response.json();
          setCollections(collectionsData);
        } catch (err: any) {
          setError(err.message);
          console.error('Error fetching collections data:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchSchoolData();
      fetchInvoices();
      fetchCollections();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!id) return <p>No school ID provided</p>; // Handle case where ID is null

  return (
    <div>
      {/* Render school details */}
      <h1 className="text-2xl font-bold mb-4">{school?.name}</h1>
      <p>Type: {school?.type}</p>
      {/* Render other school details */}

      {/* Render invoices */}
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            {/* Render invoice details */}
          </li>
        ))}
      </ul>

      {/* Render collections */}
      <h2 className="text-xl font-bold mb-4">Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            {/* Render collection details */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolDetails;
