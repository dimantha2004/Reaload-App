import React, { useState } from 'react';
import { ReloadPackage } from '../models/types';

interface AmountSelectorProps {
  amounts: ReloadPackage[];
  selectedAmount: number | null;
  onChange: (amount: number) => void;
  className?: string;
}

const AmountSelector: React.FC<AmountSelectorProps> = ({ 
  amounts, 
  selectedAmount, 
  onChange,
  className = ''
}) => {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showCustom, setShowCustom] = useState<boolean>(false);

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    
    if (value && !isNaN(Number(value))) {
      onChange(Number(value));
    }
  };

  const toggleCustomAmount = () => {
    setShowCustom(!showCustom);
    if (!showCustom) {
      setCustomAmount('');
      onChange(0);
    }
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {amounts.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`
              py-3 px-4 rounded-lg border-2 transition-all duration-200
              ${selectedAmount === option.amount && !showCustom ? 
                'border-blue-500 bg-blue-50 text-blue-700' : 
                'border-gray-200 hover:border-gray-300'
              }
              ${option.popular ? 'relative overflow-hidden' : ''}
            `}
            onClick={() => {
              setShowCustom(false);
              onChange(option.amount);
            }}
          >
            {option.popular && (
              <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs px-1 py-0.5 transform translate-x-2 -translate-y-0 rotate-45">
                Popular
              </span>
            )}
            <div className="text-center">
              <p className="font-semibold">Rs. {option.amount}</p>
            </div>
          </button>
        ))}
        
        <button
          type="button"
          className={`
            py-3 px-4 rounded-lg border-2 transition-all
            ${showCustom ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
          `}
          onClick={toggleCustomAmount}
        >
          <div className="text-center">
            <p className="font-semibold">Custom</p>
          </div>
        </button>
      </div>

      {showCustom && (
        <div className="mt-4 mb-2">
          <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-1">
            Enter custom amount (Rs. 50 - Rs. 5000)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              Rs.
            </span>
            <input
              type="number"
              id="customAmount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3"
              placeholder="Enter amount"
              min="50"
              max="5000"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AmountSelector;