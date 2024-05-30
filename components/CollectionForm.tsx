import React, { useState } from 'react';

const CollectionForm = ({ invoiceId, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    invoiceId: invoiceId,
    collectionNumber: '',
    date: '',
    amount: '',
    status: 'Valid',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    // Reset form data after submission
    setFormData({
      invoiceId: invoiceId,
      collectionNumber: '',
      date: '',
      amount: '',
      status: 'Valid',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="collectionNumber">Collection Number:</label>
        <input
          type="text"
          id="collectionNumber"
          name="collectionNumber"
          value={formData.collectionNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
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
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={formData.status} onChange={handleChange}>
          <option value="Valid">Valid</option>
          <option value="Bounced">Bounced</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Save Collection</button>
      <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-2" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default CollectionForm;