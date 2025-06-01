import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Transaction, TransactionStatus } from '../models/types';
import { formatMobileNumber, formatCurrency } from '../utils/validation';
import { getProviderById } from '../data/providers';
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const navigate = useNavigate();
  const provider = getProviderById(transaction.provider);
  const date = new Date(transaction.timestamp);
  
  const getStatusIcon = () => {
    switch(transaction.status) {
      case TransactionStatus.COMPLETED:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case TransactionStatus.FAILED:
        return <XCircle className="h-5 w-5 text-red-500" />;
      case TransactionStatus.PROCESSING:
        return <Loader2 className="h-5 w-5 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusColor = () => {
    switch(transaction.status) {
      case TransactionStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TransactionStatus.FAILED:
        return 'bg-red-100 text-red-800';
      case TransactionStatus.PROCESSING:
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const handleClick = () => {
    if (transaction.status === TransactionStatus.COMPLETED) {
      navigate(`/receipt/${transaction.id}`);
    }
  };

  return (
    <div 
      className={`
        border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow
        ${transaction.status === TransactionStatus.COMPLETED ? 'cursor-pointer' : ''}
      `}
      onClick={handleClick}
    >
      <div className={`p-4 ${provider?.lightColor || 'bg-gray-100'}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{formatMobileNumber(transaction.mobileNumber)}</p>
            <p className="text-sm text-gray-700">{provider?.name || 'Unknown Provider'}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">{formatCurrency(transaction.amount)}</p>
            <p className="text-xs text-gray-600">
              {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm px-2 py-0.5 rounded-full ${getStatusColor()}`}>
            {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
          </span>
        </div>
        
        {transaction.reference && (
          <span className="text-xs text-gray-500">
            Ref: {transaction.reference}
          </span>
        )}
        
        {transaction.status === TransactionStatus.COMPLETED && (
          <span className="text-xs text-blue-600 font-medium">
            View Receipt →
          </span>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;