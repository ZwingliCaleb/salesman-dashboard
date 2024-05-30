// components/CollectionList.tsx
import React, { useState, useEffect } from 'react';

const CollectionList = ({ schoolId }) => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/collections?schoolId=${schoolId}`)
      .then(response => response.json())
      .then(data => setCollections(data));
  }, [schoolId]);

  const handleUpdateStatus = (id, status) => {
    fetch(`http://localhost:3001/collections/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    .then(response => response.json())
    .then(data => setCollections(collections.map(col => col.id === id ? data : col)));
  };

  return (
    <div>
      <h2>Collections</h2>
      {collections.map(collection => (
        <div key={collection.id} className="border p-2 mb-2 rounded">
          <p>Invoice Number: {collection.invoiceNumber}</p>
          <p>Collection Number: {collection.id}</p>
          <p>Date of Collection: {collection.date}</p>
          <p>Amount: {collection.amount}</p>
          <p>Status: {collection.status}</p>
          <button
            className={`px-2 py-1 mr-2 ${collection.status === 'valid' ? 'bg-green-500' : 'bg-gray-300'} rounded`}
            onClick={() => handleUpdateStatus(collection.id, 'valid')}
          >
            Mark as Valid
          </button>
          <button
            className={`px-2 py-1 ${collection.status === 'bounced' ? 'bg-red-500' : 'bg-gray-300'} rounded`}
            onClick={() => handleUpdateStatus(collection.id, 'bounced')}
          >
            Mark as Bounced
          </button>
        </div>
      ))}
    </div>
  );
};

export default CollectionList;
