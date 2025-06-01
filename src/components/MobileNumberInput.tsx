import React, { useState, useEffect } from 'react';
import { Provider, ProviderType } from '../models/types';
import { getProviderByPrefix } from '../data/providers';

interface MobileNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  onProviderDetected?: (provider: Provider | null) => void;
  error?: string | null;
  className?: string;
}

const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  value,
  onChange,
  onProviderDetected,
  error,
  className = ''
}) => {
  const [detectedProvider, setDetectedProvider] = useState<Provider | null>(null);

  useEffect(() => {
    if (value && value.length >= 3) {
      const provider = getProviderByPrefix(value);
      setDetectedProvider(provider);
      
      if (onProviderDetected) {
        onProviderDetected(provider);
      }
    } else {
      setDetectedProvider(null);
      
      if (onProviderDetected) {
        onProviderDetected(null);
      }
    }
  }, [value, onProviderDetected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Only allow numbers and limit to 10 digits
    if (/^\d*$/.test(inputValue) && inputValue.length <= 10) {
      onChange(inputValue);
    }
  };

  return (
    <div className={className}>
      <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">
        Mobile Number
      </label>
      <div className="relative">
        <input
          type="tel"
          id="mobileNumber"
          value={value}
          onChange={handleChange}
          className={`
            block w-full rounded-md border shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3
            ${error ? 'border-red-300' : 'border-gray-300'}
            ${detectedProvider ? 'pr-24' : ''}
          `}
          placeholder="0XXXXXXXXX"
          maxLength={10}
        />
        
        {detectedProvider && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span 
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${detectedProvider.lightColor} text-${detectedProvider.bgColor.replace('bg-', '')}`}
            >
              {detectedProvider.name}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      <p className="mt-1 text-xs text-gray-500">
        Enter a 10-digit Sri Lankan mobile number
      </p>
    </div>
  );
};

export default MobileNumberInput;