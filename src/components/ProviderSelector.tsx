import React from 'react';
import { Provider, ProviderType } from '../models/types';
import { providers } from '../data/providers';

interface ProviderSelectorProps {
  selectedProvider: ProviderType | null;
  onChange: (provider: ProviderType) => void;
  className?: string;
}

const ProviderSelector: React.FC<ProviderSelectorProps> = ({ 
  selectedProvider, 
  onChange,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${className}`}>
      {providers.map((provider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
          isSelected={selectedProvider === provider.id}
          onClick={() => onChange(provider.id)}
        />
      ))}
    </div>
  );
};

interface ProviderCardProps {
  provider: Provider;
  isSelected: boolean;
  onClick: () => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider, isSelected, onClick }) => {
  return (
    <div
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
        ${isSelected ? 
          `border-${provider.bgColor.replace('bg-', '')} ${provider.lightColor}` : 
          'border-gray-200 bg-white hover:border-gray-300'
        }
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center">
        <div className={`w-12 h-12 rounded-full ${provider.bgColor} flex items-center justify-center mb-2`}>
          <span className="text-white font-bold text-lg">{provider.name.charAt(0)}</span>
        </div>
        <h3 className="font-medium text-center">{provider.name}</h3>
        <p className="text-xs text-gray-500 text-center mt-1">
          {provider.prefixes.join(', ')}
        </p>
      </div>
    </div>
  );
};

export default ProviderSelector;