import React, { useState, useEffect } from 'react';

const InvoiceForm = ({ invoice, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceItem: '',
    dueDate: '',
    amount: '',
    paidAmount: '',
    completed: false,
  });

  useEffect(() => {
    if (invoice) {
      setFormData(invoice);
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="invoiceNumber">Invoice Number:</label>
        <input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={formData.invoiceNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="invoiceItem">Invoice Item:</label>
        <input
          type="text"
          id="invoiceItem"
          name="invoiceItem"
          value={formData.invoiceItem}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due Date:</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="paidAmount">Paid Amount:</label>
        <input
          type="number"
          id="paidAmount"
          name="paidAmount"
          value={formData.paidAmount}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="completed">Completed:</label>
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={formData.completed}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Save Invoice</button>
      <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-2" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default InvoiceForm;
