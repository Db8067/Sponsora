import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmAlertProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmAlert({ isOpen, message, onConfirm, onCancel }: ConfirmAlertProps) {
  if (!isOpen) return null;

  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 scale-in-center border border-slate-200 dark:border-white/10">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Confirm Action</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{message}</p>
          
          <div className="flex items-center gap-3 w-full">
            <button 
              onClick={onCancel}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-colors shadow-lg shadow-red-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? 'Processing...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
