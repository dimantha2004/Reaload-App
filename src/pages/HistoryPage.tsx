import React, { useEffect, useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import TransactionCard from '../components/TransactionCard';
import { Transaction, TransactionStatus } from '../models/types';
import { Clock, Filter, RefreshCw } from 'lucide-react';

const HistoryPage: React.FC = () => {
  const { transactions, refreshTransactions } = useTransactions();
  const [filter, setFilter] = useState<string>('all');
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    // Apply filter
    if (filter === 'all') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(t => t.status === filter)
      );
    }
  }, [transactions, filter]);
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
        <button 
          onClick={() => refreshTransactions()}
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <h2 className="text-sm font-medium text-gray-700">Filter Transactions</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <FilterButton 
            label="All" 
            active={filter === 'all'} 
            onClick={() => setFilter('all')} 
          />
          <FilterButton 
            label="Completed" 
            active={filter === TransactionStatus.COMPLETED} 
            onClick={() => setFilter(TransactionStatus.COMPLETED)} 
          />
          <FilterButton 
            label="Pending" 
            active={filter === TransactionStatus.PENDING} 
            onClick={() => setFilter(TransactionStatus.PENDING)} 
          />
          <FilterButton 
            label="Processing" 
            active={filter === TransactionStatus.PROCESSING} 
            onClick={() => setFilter(TransactionStatus.PROCESSING)} 
          />
          <FilterButton 
            label="Failed" 
            active={filter === TransactionStatus.FAILED} 
            onClick={() => setFilter(TransactionStatus.FAILED)} 
          />
        </div>
      </div>
      
      {/* Transactions list */}
      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? "You haven't made any transactions yet."
                : `No ${filter} transactions found.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, active, onClick }) => {
  return (
    <button
      type="button"
      className={`
        px-3 py-1 rounded-full text-sm font-medium
        ${active ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
      `}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HistoryPage;