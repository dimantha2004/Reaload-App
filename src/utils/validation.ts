import { getProviderByPrefix } from '../data/providers';

// Mobile number validation
export const validateMobileNumber = (mobileNumber: string): string | null => {
  if (!mobileNumber) {
    return 'Mobile number is required';
  }

  // Remove any spaces or dashes
  const cleanNumber = mobileNumber.replace(/[\s-]/g, '');

  // Check if it's numeric
  if (!/^\d+$/.test(cleanNumber)) {
    return 'Mobile number must contain only digits';
  }

  // Check if it's 10 digits (Sri Lankan mobile number format)
  if (cleanNumber.length !== 10) {
    return 'Mobile number must be 10 digits';
  }

  // Check if it's a valid prefix
  const provider = getProviderByPrefix(cleanNumber);
  if (!provider) {
    return 'Invalid mobile network prefix';
  }

  return null; // No error means valid
};

// Amount validation
export const validateAmount = (amount: number | null): string | null => {
  if (amount === null || amount === undefined) {
    return 'Amount is required';
  }

  if (isNaN(amount) || amount <= 0) {
    return 'Amount must be a positive number';
  }

  // Check if amount is within the allowed range
  if (amount < 50) {
    return 'Minimum reload amount is Rs. 50';
  }

  if (amount > 5000) {
    return 'Maximum reload amount is Rs. 5000';
  }

  return null; // No error means valid
};

export const formatMobileNumber = (number: string): string => {
  if (!number || number.length !== 10) return number;
  
  // Format as 07X XXX XXXX
  return `${number.substring(0, 3)} ${number.substring(3, 6)} ${number.substring(6, 10)}`;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return `Rs. ${amount.toFixed(2)}`;
};

// Generate transaction ID
export const generateTransactionId = (): string => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `TXN${timestamp}${random}`;
};