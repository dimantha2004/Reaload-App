// Provider Types
export enum ProviderType {
  DIALOG = 'Dialog',
  MOBITEL = 'Mobitel',
  HUTCH = 'Hutch',
  AIRTEL = 'Airtel'
}

export interface Provider {
  id: ProviderType;
  name: string;
  prefixes: string[];
  color: string;
  bgColor: string;
  lightColor: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  mobileNumber: string;
  provider: ProviderType;
  amount: number;
  timestamp: number;
  status: TransactionStatus;
  reference?: string;
}

export enum TransactionStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// Reload Packages
export interface ReloadPackage {
  id: string;
  amount: number;
  description?: string;
  popular?: boolean;
}

// Form Types
export interface ReloadFormData {
  mobileNumber: string;
  provider: ProviderType | null;
  amount: number | null;
  customAmount?: number;
}