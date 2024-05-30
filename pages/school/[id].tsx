// pages/school/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import InvoiceList from '../../components/InvoiceList';
import CollectionList from '../../components/CollectionList';

const SchoolDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex">
      <div className="w-48">
        {/* Sidebar component if needed */}
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">School Details</h1>
        {/* Display school details here */}
        <InvoiceList schoolId={id} />
        <CollectionList schoolId={id} />
      </div>
    </div>
  );
};

export default SchoolDetails;
