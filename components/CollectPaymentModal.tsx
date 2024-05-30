import React from 'react';

interface CollectPaymentModalProps {
  selectedInvoice: Invoice | null;
  handlePaymentSubmit: (event: React.FormEvent) => void;
  handleModalClose: () => void;
}

const CollectPaymentModal: React.FC<CollectPaymentModalProps> = ({ selectedInvoice, handlePaymentSubmit, handleModalClose }) => {
  if (!selectedInvoice) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden z-50 max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Collect Payment</h3>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleModalClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handlePaymentSubmit} className="mt-4">
          <p>School: {selectedInvoice.schoolName}</p>
          <p>Amount Due: ${selectedInvoice.amountDue}</p>
          <input type="hidden" name="invoiceId" value={selectedInvoice.id} />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Payment Amount</label>
            <input
              type="number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="paymentAmount"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Payment Date</label>
            <input
              type="date"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="paymentDate"
              required
            />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
              onClick={handleModalClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectPaymentModal;
