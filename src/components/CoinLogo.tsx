import React from 'react';

interface CoinLogoProps {
  name: string;
  symbol: string;
  logoUrl: string;
}

const CoinLogo: React.FC<CoinLogoProps> = ({ name, symbol, logoUrl }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 flex-shrink-0">
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            
            // Add null check for parent element
            if (target.parentElement) {
              target.parentElement.innerHTML = symbol.substring(0, 2);
              target.parentElement.className += ' bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-xs font-bold';
            }
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-neutral-500 text-xs">{symbol}</span>
      </div>
    </div>
  );
};

export default CoinLogo;