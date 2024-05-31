import React, { useState, useEffect } from 'react';
import InvoiceForm from './InvoiceForm';
import CollectionForm from './CollectionForm';

const Invoices = ({ schoolId }) => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [showCollectionForm, setShowCollectionForm] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [schoolId]);

  const fetchInvoices = async () => {
    try {
      const response = await fetch(`http://localhost:3001/invoices?schoolId=${schoolId}`);
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleSaveInvoice = async (invoice: any) => {
    try {
      let response;
      if (invoice.id) {
        // Update invoice
        response = await fetch(`http://localhost:3001/invoices/${invoice.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(invoice),
        });
      } else {
        // Create new invoice
        response = await fetch('http://localhost:3001/invoices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...invoice, schoolId }),
        });
      }
      await response.json();
      fetchInvoices();
      setShowInvoiceForm(false);
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handleDeleteInvoice = async (invoiceId: any) => {
    try {
      await fetch(`http://localhost:3001/invoices/${invoiceId}`, { method: 'DELETE' });
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleAddCollection = async (collection: any) => {
    try {
      const response = await fetch('http://localhost:3001/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collection),
      });
      await response.json();
      fetchInvoices();
      setShowCollectionForm(false);
    } catch (error) {
      console.error('Error adding collection:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Invoices</h2>
      <button
        className="bg-teal-500 text-white py-2 px-4 rounded mb-4"
        onClick={() => {
          setSelectedInvoice(null);
          setShowInvoiceForm(true);
        }}
      >
        Add Invoice
      </button>
      <div>
        {invoices.map((invoice) => (
          <div key={invoice.id} className="bg-white p-4 mb-2 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p>Invoice Number: {invoice.invoiceNumber}</p>
                <p>Invoice Item: {invoice.invoiceItem}</p>
                <p>Due Date: {invoice.dueDate}</p>
                <p>Amount: ${invoice.amount}</p>
                <p>Paid Amount: ${invoice.paidAmount}</p>
                <p>Balance: ${invoice.amount - invoice.paidAmount}</p>
                <p>Status: {invoice.completed ? 'Completed' : 'Pending'}</p>
              </div>
              <div>
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                  onClick={() => {
                    setSelectedInvoice(invoice);
                    setShowInvoiceForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white py-1 px-3 rounded"
                  onClick={() => handleDeleteInvoice(invoice.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-green-500 text-white py-1 px-3 rounded mt-2"
                  onClick={() => {
                    setSelectedInvoice(invoice);
                    setShowCollectionForm(true);
                  }}
                >
                  Add Collection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showInvoiceForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <InvoiceForm
              invoice={selectedInvoice}
              onSave={handleSaveInvoice}
              onClose={() => setShowInvoiceForm(false)}
            />
          </div>
        </div>
      )}
      {showCollectionForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <CollectionForm
              invoiceId={selectedInvoice.id}
              onSave={handleAddCollection}
              onClose={() => setShowCollectionForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
