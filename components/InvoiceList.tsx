// components/InvoiceList.tsx
import React, { useEffect, useState } from 'react';

interface Invoice {
  id: number;
  invoiceNumber: string;
  amountDue: number;
  dueDate: string;
  status: string;
}

interface InvoiceListProps {
  schoolId: number;
}

const InvoiceList: React.FC<InvoiceListProps> = ({ schoolId }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`http://localhost:3001/invoices?schoolId=${schoolId}`);
        const data: Invoice[] = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, [schoolId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Invoices</h2>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id} className="mb-2">
            <div>
              <p>Invoice Number: {invoice.invoiceNumber}</p>
              <p>Amount Due: ${invoice.amountDue}</p>
              <p>Due Date: {invoice.dueDate}</p>
              <p>Status: {invoice.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;
