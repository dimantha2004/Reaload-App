import { Provider, ProviderType } from '../models/types';

export const providers: Provider[] = [
  {
    id: ProviderType.DIALOG,
    name: 'Dialog',
    prefixes: ['077', '076', '075', '072'],
    color: '#00A651',
    bgColor: 'bg-green-600',
    lightColor: 'bg-green-100'
  },
  {
    id: ProviderType.MOBITEL,
    name: 'Mobitel',
    prefixes: ['071', '070'],
    color: '#0066B3',
    bgColor: 'bg-blue-600',
    lightColor: 'bg-blue-100'
  },
  {
    id: ProviderType.HUTCH,
    name: 'Hutch',
    prefixes: ['078'],
    color: '#FF6600',
    bgColor: 'bg-orange-600',
    lightColor: 'bg-orange-100'
  },
  {
    id: ProviderType.AIRTEL,
    name: 'Airtel',
    prefixes: ['075'],
    color: '#ED1C24',
    bgColor: 'bg-red-600',
    lightColor: 'bg-red-100'
  }
];

export const getProviderByPrefix = (mobileNumber: string): Provider | null => {
  if (!mobileNumber || mobileNumber.length < 3) return null;
  
  const prefix = mobileNumber.substring(0, 3);
  
  return providers.find(provider => 
    provider.prefixes.includes(prefix)
  ) || null;
};

export const getProviderById = (id: ProviderType): Provider | null => {
  return providers.find(provider => provider.id === id) || null;
};

export const getReloadAmounts = (provider: ProviderType) => {
  // Common reload amounts for all providers
  return [
    { id: '1', amount: 50, popular: false },
    { id: '2', amount: 100, popular: true },
    { id: '3', amount: 200, popular: false },
    { id: '4', amount: 500, popular: true },
    { id: '5', amount: 1000, popular: true },
    { id: '6', amount: 2000, popular: false },
    { id: '7', amount: 5000, popular: false }
  ];
};