import { Transaction, TransactionStatus, ProviderType } from '../models/types';
import { generateTransactionId } from '../utils/validation';

// Simulate localStorage for transaction storage
const STORAGE_KEY = 'smartreload_transactions';

// Get all transactions
export const getTransactions = (): Transaction[] => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    return [];
  }
};

// Get transaction by ID
export const getTransactionById = (id: string): Transaction | null => {
  const transactions = getTransactions();
  return transactions.find(t => t.id === id) || null;
};

// Save a new transaction
export const saveTransaction = (transaction: Transaction): Transaction => {
  try {
    const transactions = getTransactions();
    transactions.unshift(transaction); // Add to beginning of array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return transaction;
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw new Error('Failed to save transaction');
  }
};

// Update an existing transaction
export const updateTransaction = (updatedTransaction: Transaction): Transaction => {
  try {
    const transactions = getTransactions();
    const index = transactions.findIndex(t => t.id === updatedTransaction.id);
    
    if (index !== -1) {
      transactions[index] = updatedTransaction;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      return updatedTransaction;
    } else {
      throw new Error('Transaction not found');
    }
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Failed to update transaction');
  }
};

// Process a reload
export const processReload = async (
  mobileNumber: string,
  provider: ProviderType,
  amount: number
): Promise<Transaction> => {
  // Create a new transaction
  const transaction: Transaction = {
    id: generateTransactionId(),
    mobileNumber,
    provider,
    amount,
    timestamp: Date.now(),
    status: TransactionStatus.PENDING
  };

  // Save the initial transaction
  saveTransaction(transaction);

  // Update to processing
  transaction.status = TransactionStatus.PROCESSING;
  updateTransaction(transaction);

  // Simulate processing delay (1-3 seconds)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate success (could add random failure in the future)
      transaction.status = TransactionStatus.COMPLETED;
      transaction.reference = `REF${Math.floor(Math.random() * 1000000)}`;
      
      // Update the transaction
      updateTransaction(transaction);
      
      resolve(transaction);
    }, 1000 + Math.random() * 2000);
  });
};

// Clear all transactions (for testing)
export const clearTransactions = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};