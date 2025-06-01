import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ProviderType, ReloadFormData } from '../models/types';
import { useTransactions } from '../context/TransactionContext';
import MobileNumberInput from '../components/MobileNumberInput';
import ProviderSelector from '../components/ProviderSelector';
import AmountSelector from '../components/AmountSelector';
import ProcessingAnimation from '../components/ProcessingAnimation';
import { getProviderByPrefix, getReloadAmounts } from '../data/providers';
import { validateMobileNumber, validateAmount } from '../utils/validation';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';

const ReloadPage: React.FC = () => {
  const navigate = useNavigate();
  const { processTransaction, loading } = useTransactions();
  
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ReloadFormData>({
    mobileNumber: '',
    provider: null,
    amount: null,
  });
  
  const [errors, setErrors] = useState<{
    mobileNumber: string | null;
    provider: string | null;
    amount: string | null;
  }>({
    mobileNumber: null,
    provider: null,
    amount: null
  });

  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  
  // Auto-detect provider when mobile number changes
  useEffect(() => {
    if (formData.mobileNumber.length >= 3) {
      const provider = getProviderByPrefix(formData.mobileNumber);
      if (provider) {
        setFormData(prev => ({ ...prev, provider: provider.id }));
      }
    }
  }, [formData.mobileNumber]);
  
  const handleMobileNumberChange = (value: string) => {
    setFormData(prev => ({ ...prev, mobileNumber: value }));
    setErrors(prev => ({ ...prev, mobileNumber: null }));
  };
  
  const handleProviderChange = (provider: ProviderType) => {
    setFormData(prev => ({ ...prev, provider }));
    setErrors(prev => ({ ...prev, provider: null }));
  };
  
  const handleAmountChange = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
    setErrors(prev => ({ ...prev, amount: null }));
  };
  
  const validateStep = (step: number): boolean => {
    let isValid = true;
    const newErrors = { ...errors };
    
    if (step === 1) {
      const mobileNumberError = validateMobileNumber(formData.mobileNumber);
      newErrors.mobileNumber = mobileNumberError;
      
      if (!formData.provider) {
        newErrors.provider = 'Please select a provider';
      }
      
      isValid = !mobileNumberError && !!formData.provider;
    } else if (step === 2) {
      const amountError = validateAmount(formData.amount);
      newErrors.amount = amountError;
      
      isValid = !amountError;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setShowConfirmation(true);
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };
  
  const goToPreviousStep = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleSubmit = async () => {
    try {
      if (!formData.provider || !formData.amount) {
        return;
      }
      
      const transaction = await processTransaction(
        formData.mobileNumber,
        formData.provider,
        formData.amount
      );
      
      toast.success('Reload successful!');
      navigate(`/receipt/${transaction.id}`);
    } catch (error) {
      toast.error('Failed to process reload. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <ProcessingAnimation />
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 p-4 text-white">
        <h1 className="text-xl font-semibold">Mobile Reload</h1>
        <div className="flex mt-4">
          <StepIndicator 
            step={1} 
            currentStep={currentStep}
            label="Number"
            showConfirmation={showConfirmation}
          />
          <StepIndicator 
            step={2} 
            currentStep={currentStep}
            label="Amount"
            showConfirmation={showConfirmation}
          />
          <StepIndicator 
            step={3} 
            currentStep={showConfirmation ? 3 : currentStep}
            label="Confirm"
            showConfirmation={showConfirmation}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {!showConfirmation ? (
          <>
            {currentStep === 1 && (
              <div className="space-y-6">
                <MobileNumberInput
                  value={formData.mobileNumber}
                  onChange={handleMobileNumberChange}
                  error={errors.mobileNumber}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Provider
                  </label>
                  <ProviderSelector
                    selectedProvider={formData.provider}
                    onChange={handleProviderChange}
                  />
                  {errors.provider && (
                    <p className="mt-1 text-sm text-red-600">{errors.provider}</p>
                  )}
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-1">Select Amount</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose a reload amount or enter a custom value
                  </p>
                  
                  <AmountSelector
                    amounts={getReloadAmounts(formData.provider!)}
                    selectedAmount={formData.amount}
                    onChange={handleAmountChange}
                  />
                  
                  {errors.amount && (
                    <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                  )}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-gray-900">Confirm Reload</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="font-medium">{formData.mobileNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Provider</p>
                  <p className="font-medium">{formData.provider}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-medium">Rs. {formData.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fee</p>
                  <p className="font-medium">Rs. 0.00</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <p className="font-semibold">Total</p>
                  <p className="font-bold">Rs. {formData.amount}</p>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              By proceeding, you confirm that the details above are correct.
            </p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        {currentStep > 1 || showConfirmation ? (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={goToPreviousStep}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {!showConfirmation ? (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={goToNextStep}
          >
            {currentStep === 2 ? 'Review' : 'Continue'}
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={handleSubmit}
          >
            Confirm and Pay
            <CheckCircle className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
  showConfirmation: boolean;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, currentStep, label, showConfirmation }) => {
  const isActive = showConfirmation ? step === 3 : step === currentStep;
  const isCompleted = showConfirmation ? step < 3 : step < currentStep;
  
  return (
    <div className="flex-1 relative">
      <div className="flex items-center">
        <div className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isActive ? 'bg-white text-blue-600' : 
            isCompleted ? 'bg-blue-300 text-white' : 'bg-blue-200 text-blue-600'}
        `}>
          {isCompleted ? <CheckCircle className="h-5 w-5" /> : step}
        </div>
        <div className="flex-1 h-1 mx-2 
          ${step === 3 ? 'hidden' : 
            isCompleted || (isActive && step === 1) ? 'bg-blue-300' : 'bg-blue-200'}
        "></div>
      </div>
      <p className="text-xs mt-1 text-white">{label}</p>
    </div>
  );
};

export default ReloadPage;