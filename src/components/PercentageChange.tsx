import React, { useState, useEffect } from 'react';
import { formatPercentage, getPercentageColorClass } from '../utils/formatters';

interface PercentageChangeProps {
  value: number;
  previousValue?: number;
}

const PercentageChange: React.FC<PercentageChangeProps> = ({ value, previousValue }) => {
  const [animate, setAnimate] = useState(false);
  const colorClass = getPercentageColorClass(value);
  
  useEffect(() => {
    // Only animate when the previous value exists and has changed
    if (previousValue !== undefined && previousValue !== value) {
      setAnimate(true);
      
      const timer = setTimeout(() => {
        setAnimate(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);
  
  const animationClass = animate 
    ? value > (previousValue || 0) 
      ? 'animate-pulse-once' 
      : 'animate-pulse-once'
    : '';
  
  return (
    <span className={`${colorClass} ${animationClass} font-medium`}>
      {formatPercentage(value)}
    </span>
  );
};

export default PercentageChange;