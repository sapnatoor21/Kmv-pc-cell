import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  variant?: 'blue' | 'navy' | 'emerald' | 'amber';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'blue',
}) => {
  const iconTheme = {
    blue: 'bg-[#0D6EFD]/10 text-[#0D6EFD]',
    navy: 'bg-[#102B50]/10 text-[#102B50]',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  }[variant];

  return (
    <div className="bg-white rounded-xl border border-[#DCE8F7] p-5 shadow-xs hover:border-[#0D6EFD]/40 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B85A8]">{title}</span>
        <div className={`p-2.5 rounded-lg ${iconTheme}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl lg:text-3xl font-bold text-[#16345C]">{value}</span>
        {trend && <span className="text-xs font-medium text-emerald-600">{trend}</span>}
      </div>
      {subtitle && <p className="mt-1 text-xs text-[#6B85A8]">{subtitle}</p>}
    </div>
  );
};
