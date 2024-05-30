import React, { useEffect, useState } from "react";

interface Invoice {
  id: number;
  schoolName: string;
  amountDue: number;
  dueDate: string;
  status: string;
}

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/invoices");
        if (!response.ok) {
          throw new Error("Failed to fetch invoices data");
        }
        const data = await response.json();
        setInvoices(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching invoices data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">School Name</th>
            <th className="py-2 px-4 border-b">Amount Due</th>
            <th className="py-2 px-4 border-b">Due Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="py-2 px-4 border-b">{invoice.schoolName}</td>
              <td className="py-2 px-4 border-b">{invoice.amountDue}</td>
              <td className="py-2 px-4 border-b">{invoice.dueDate}</td>
              <td className="py-2 px-4 border-b">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoicesPage;
