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
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none animate-in fade-in duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-md font-medium text-lg scale-in-center transition-all ${
        type === 'success' 
          ? 'bg-green-500/90 text-white border-green-400/50 shadow-green-500/30' 
          : 'bg-red-500/90 text-white border-red-400/50 shadow-red-500/30'
      }`}>
        {type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
        {message}
      </div>
    </div>
  );
}
