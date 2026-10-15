import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'navy' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'sm' }) => {
  const styles = {
    primary: 'bg-[#0D6EFD]/10 text-[#0D6EFD] border-[#0D6EFD]/25',
    secondary: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    navy: 'bg-[#102B50] text-white border-[#102B50]',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  }[size];

  return (
    <span className={`inline-flex items-center font-medium rounded-full border ${styles} ${sizeStyles}`}>
      {children}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const normalized = status.toLowerCase();

  if (normalized === 'applied' || normalized === 'under_review') {
    return <Badge variant="secondary">Applied</Badge>;
  }
  if (normalized === 'shortlisted') {
    return <Badge variant="primary">Shortlisted</Badge>;
  }
  if (normalized === 'assessment_round') {
    return <Badge variant="warning">Assessment Round</Badge>;
  }
  if (normalized === 'interview_scheduled') {
    return <Badge variant="warning">Interview Scheduled</Badge>;
  }
  if (normalized === 'selected' || normalized === 'placed' || normalized === 'verified') {
    return <Badge variant="success">Selected / Placed</Badge>;
  }
  if (normalized === 'rejected') {
    return <Badge variant="danger">Not Shortlisted</Badge>;
  }
  if (normalized === 'open') {
    return <Badge variant="success">Open</Badge>;
  }
  if (normalized === 'closed') {
    return <Badge variant="neutral">Closed</Badge>;
  }
  if (normalized === 'upcoming') {
    return <Badge variant="primary">Upcoming</Badge>;
  }

  return <Badge variant="neutral">{status}</Badge>;
};
