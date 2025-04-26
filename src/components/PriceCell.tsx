import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatters';

interface PriceCellProps {
  value: number;
  previousValue?: number;
}

const PriceCell: React.FC<PriceCellProps> = ({ value, previousValue }) => {
  const [animate, setAnimate] = useState(false);
  const [increasing, setIncreasing] = useState(false);
  
  useEffect(() => {
    // Only animate when the previous value exists and has changed
    if (previousValue !== undefined && previousValue !== value) {
      setIncreasing(value > previousValue);
      setAnimate(true);
      
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);
  
  const animationClass = animate ? 'animate-pulse-once' : '';
  const colorClass = animate 
    ? increasing 
      ? 'text-success-500' 
      : 'text-danger-500' 
    : 'text-neutral-900';
  
  return (
    <span className={`${colorClass} ${animationClass} font-medium`}>
      {formatCurrency(value)}
    </span>
  );
};

export default PriceCell;