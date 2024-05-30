import React, { useEffect, useState } from 'react';

interface Collection {
  id: number;
  invoiceId: number;
  collectionNumber: string;
  date: string;
  status: string;
  amount: number;
}

interface CollectionsProps {
  schoolId: number;
}

const Collections: React.FC<CollectionsProps> = ({ schoolId }) => {
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(`http://localhost:3001/schools/${schoolId}/collections`);
        if (!response.ok) {
          throw new Error('Failed to fetch collections data');
        }
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    };

    fetchCollections();
  }, [schoolId]);

  const handleStatusChange = async (collectionId: number, status: string) => {
    try {
      const response = await fetch(`http://localhost:3001/collections/${collectionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update collection status');
      }

      // Update collections data after changing status
      const updatedCollections = await response.json();
      setCollections(updatedCollections);
    } catch (error) {
      console.error('Error updating collection status:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Collections</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Collection #{collection.collectionNumber}</h3>
              <div className="space-x-2">
                <button
                  className={`py-1 px-3 rounded ${collection.status === 'Valid' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                  onClick={() => handleStatusChange(collection.id, collection.status === 'Valid' ? 'Bounced' : 'Valid')}
                >
                  {collection.status}
                </button>
              </div>
            </div>
            <p className="mt-2">Invoice ID: {collection.invoiceId}</p>
            <p className="mt-1">Date: {collection.date}</p>
            <p className="mt-1">Amount: {collection.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
