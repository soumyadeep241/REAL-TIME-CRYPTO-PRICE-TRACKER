import React, { useState, useRef } from 'react';
import { HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };
  
  return (
    <div className="inline-block relative">
      <div 
        className="text-neutral-400 cursor-help inline-flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <HelpCircle size={16} />
      </div>
      
      {isVisible && (
        <div 
          className="absolute z-10 bg-neutral-800 text-white text-xs p-2 rounded shadow-lg w-48 -left-24 bottom-full mb-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="absolute w-2 h-2 bg-neutral-800 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
          {content}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;