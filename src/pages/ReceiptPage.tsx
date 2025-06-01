import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTransactionById } from '../services/TransactionService';
import { Transaction } from '../models/types';
import { formatMobileNumber, formatCurrency } from '../utils/validation';
import { getProviderById } from '../data/providers';
import { Download, Printer, ArrowLeft, CheckCircle } from 'lucide-react';

const ReceiptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (id) {
      const fetchedTransaction = getTransactionById(id);
      setTransaction(fetchedTransaction);
      setLoading(false);
    }
  }, [id]);
  
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // In a real application, this would generate a PDF
    // For this demo, we'll just alert
    alert('In a production app, this would download a PDF receipt.');
  };
  
  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <p>Loading receipt...</p>
      </div>
    );
  }
  
  if (!transaction) {
    return (
      <div className="max-w-md mx-auto p-4 text-center">
        <p className="text-red-600">Receipt not found. The transaction may have been deleted or expired.</p>
        <button
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          onClick={() => navigate('/history')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to History
        </button>
      </div>
    );
  }
  
  const provider = getProviderById(transaction.provider);
  const date = new Date(transaction.timestamp);
  
  return (
    <div className="max-w-md mx-auto">
      {/* Receipt Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden print:shadow-none" id="receipt">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white text-center print:bg-blue-600">
          <CheckCircle className="h-12 w-12 mx-auto mb-2" />
          <h1 className="text-xl font-bold">Payment Receipt</h1>
          <p className="text-blue-100">Transaction successful</p>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-semibold">Mobile Reload</h2>
              <p className="text-gray-600">{provider?.name}</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${provider?.bgColor || 'bg-gray-500'} flex items-center justify-center text-white font-bold`}>
              {provider?.name.charAt(0) || 'U'}
            </div>
          </div>
          
          <div className="py-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Mobile Number</p>
                <p className="font-medium">{formatMobileNumber(transaction.mobileNumber)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-medium">{formatCurrency(transaction.amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-medium">{date.toLocaleDateString()} {date.toLocaleTimeString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Reference</p>
                <p className="font-medium">{transaction.reference || 'N/A'}</p>
              </div>
            </div>
          </div>
          
          <div className="py-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500">Subtotal</p>
              <p>{formatCurrency(transaction.amount)}</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500">Fee</p>
              <p>{formatCurrency(0)}</p>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-200">
              <p className="font-semibold">Total Paid</p>
              <p className="font-bold text-lg">{formatCurrency(transaction.amount)}</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">Thank you for using SmartReload!</p>
            <p className="text-xs text-gray-400 mt-1">Transaction ID: {transaction.id}</p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="mt-6 flex justify-between print:hidden">
        <button
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          onClick={() => navigate('/history')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to History
        </button>
        
        <div className="flex space-x-2">
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            onClick={handlePrint}
          >
            <Printer className="h-4 w-4 mr-1" />
            Print
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;