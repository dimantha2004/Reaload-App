import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, ProviderType } from '../models/types';
import { processReload, getTransactions } from '../services/TransactionService';

interface TransactionContextType {
  currentTransaction: Transaction | null;
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  processTransaction: (mobileNumber: string, provider: ProviderType, amount: number) => Promise<Transaction>;
  refreshTransactions: () => void;
  setCurrentTransaction: (transaction: Transaction | null) => void;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshTransactions = () => {
    try {
      const allTransactions = getTransactions();
      setTransactions(allTransactions);
    } catch (err) {
      setError('Failed to load transactions');
      console.error(err);
    }
  };

  // Load transactions on initial render
  React.useEffect(() => {
    refreshTransactions();
  }, []);

  const processTransaction = async (
    mobileNumber: string,
    provider: ProviderType,
    amount: number
  ): Promise<Transaction> => {
    setLoading(true);
    setError(null);
    
    try {
      const transaction = await processReload(mobileNumber, provider, amount);
      setCurrentTransaction(transaction);
      refreshTransactions();
      return transaction;
    } catch (err) {
      const errorMessage = 'Transaction failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentTransaction,
    transactions,
    loading,
    error,
    processTransaction,
    refreshTransactions,
    setCurrentTransaction
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};