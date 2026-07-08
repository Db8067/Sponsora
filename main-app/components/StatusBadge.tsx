import React from 'react';

type Status = 'approved' | 'pending' | 'rejected';

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusStyles = (status: Status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const getStatusText = (status: Status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'pending':
        return 'Pending Review';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyles(status)}`}>
      {getStatusText(status)}
    </span>
  );
}
