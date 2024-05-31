// components/InvoiceList.tsx
import React, { useEffect, useState } from 'react';

const InvoiceList = ({ schoolId }) => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const response = await fetch(`http://localhost:3001/invoices?schoolId=${schoolId}`);
      const data = await response.json();
      setInvoices(data);
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
              <p>Amount Due: {invoice.amountDue}</p>
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
