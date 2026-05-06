import React from 'react';
import styles from './CustomButton.module.css';

const CustomButton: React.FC<{ 
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className = '' }) => {
  return (
    <button 
      onClick={onClick}
      className={`${styles.button} ${className}`}
      >
      {children}
    </button>
  );
};

export default CustomButton;