// components/InvoiceForm.tsx
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';

interface Invoice {
  id?: number;
  invoiceNumber: string;
  invoiceItem: string;
  dueDate: string;
  amount: number;
  paidAmount: number;
  completed: boolean;
}

interface InvoiceFormProps {
  invoice: Invoice | null;
  onSave: (invoice: Invoice) => void;
  onClose: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoice, onSave, onClose }) => {
  const [formData, setFormData] = useState<Invoice>({
    invoiceNumber: '',
    invoiceItem: '',
    dueDate: '',
    amount: 0,
    paidAmount: 0,
    completed: false,
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-4">
      <div className="mb-2">
        <label htmlFor="invoiceNumber" className="block text-gray-700">Invoice Number:</label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="invoiceItem" className="block text-gray-700">Invoice Item:</label>
        <input
          type="text"
          id="invoiceItem"
          name="invoiceItem"
          value={formData.invoiceItem}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="dueDate" className="block text-gray-700">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="amount" className="block text-gray-700">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="paidAmount" className="block text-gray-700">Paid Amount:</label>
        <input
          type="number"
          id="paidAmount"
          name="paidAmount"
          value={formData.paidAmount}
          onChange={handleChange}
          className="form-input mt-1 block w-full border border-gray-300 rounded-sm"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="completed" className="block text-gray-700">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
          className="form-checkbox mt-1 block"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 mr-2">Save Invoice</button>
      <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded mt-4" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default InvoiceForm;
