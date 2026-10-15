import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Toast: React.FC = () => {
  const { toast, clearToast } = useAuth();
  if (!toast) return null;

  const bgStyles = {
    success: 'bg-[#102B50] text-white border-l-4 border-emerald-500 shadow-xl',
    error: 'bg-rose-950 text-rose-50 border-l-4 border-rose-500 shadow-xl',
    info: 'bg-[#102B50] text-white border-l-4 border-[#0D6EFD] shadow-xl',
  }[toast.type];

  const Icon = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
  }[toast.type];

  const iconColors = {
    success: 'text-emerald-400',
    error: 'text-rose-400',
    info: 'text-[#0D6EFD]',
  }[toast.type];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-start gap-3 px-4 py-3.5 rounded-lg border border-[#DCE8F7]/20 ${bgStyles}`}>
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColors}`} />
        <p className="text-sm font-medium flex-1 leading-snug">{toast.message}</p>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-white transition-colors p-0.5"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
