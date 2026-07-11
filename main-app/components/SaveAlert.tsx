import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface SaveAlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export function SaveAlert({ message, type, onClose }: SaveAlertProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border backdrop-blur-md font-medium text-sm ${
        type === 'success' 
          ? 'bg-green-500/90 text-white border-green-400/50 shadow-green-500/20' 
          : 'bg-red-500/90 text-white border-red-400/50 shadow-red-500/20'
      }`}>
        {type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        {message}
      </div>
    </div>
  );
}
