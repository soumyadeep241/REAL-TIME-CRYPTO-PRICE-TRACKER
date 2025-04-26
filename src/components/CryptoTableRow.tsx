import React, { useRef } from 'react';
import CoinLogo from './CoinLogo';
import PriceCell from './PriceCell';
import PercentageChange from './PercentageChange';
import MiniChart from './MiniChart';
import { 
  formatLargeNumber, 
  formatSupply
} from '../utils/formatters';
import { CryptoAsset } from '../types/crypto';

interface CryptoTableRowProps {
  asset: CryptoAsset;
  isEven: boolean;
}

const CryptoTableRow: React.FC<CryptoTableRowProps> = ({ asset, isEven }) => {
  // Use ref to store previous values for animations
  const prevValuesRef = useRef({
    price: asset.price,
    priceChange1h: asset.priceChange1h,
    priceChange24h: asset.priceChange24h,
    priceChange7d: asset.priceChange7d,
    volume24h: asset.volume24h
  });

  // Check if values have been updated
  const isUpdated = asset.lastUpdated && (
    prevValuesRef.current.price !== asset.price ||
    prevValuesRef.current.priceChange1h !== asset.priceChange1h ||
    prevValuesRef.current.priceChange24h !== asset.priceChange24h ||
    prevValuesRef.current.priceChange7d !== asset.priceChange7d ||
    prevValuesRef.current.volume24h !== asset.volume24h
  );

  // Update the previous values after checking
  if (isUpdated) {
    prevValuesRef.current = {
      price: asset.price,
      priceChange1h: asset.priceChange1h,
      priceChange24h: asset.priceChange24h,
      priceChange7d: asset.priceChange7d,
      volume24h: asset.volume24h
    };
  }

  const rowClass = isEven ? 'bg-white' : 'bg-neutral-50';

  return (
    <tr className={`${rowClass} border-b border-neutral-200 hover:bg-neutral-100 transition-colors`}>
      <td className="px-4 py-4 text-center">{asset.rank}</td>
      <td className="px-4 py-4">
        <CoinLogo 
          name={asset.name} 
          symbol={asset.symbol} 
          logoUrl={asset.logoUrl} 
        />
      </td>
      <td className="px-4 py-4">
        <PriceCell 
          value={asset.price} 
          previousValue={isUpdated ? prevValuesRef.current.price : undefined} 
        />
      </td>
      <td className="px-4 py-4 text-right">
        <PercentageChange 
          value={asset.priceChange1h} 
          previousValue={isUpdated ? prevValuesRef.current.priceChange1h : undefined}
        />
      </td>
      <td className="px-4 py-4 text-right">
        <PercentageChange 
          value={asset.priceChange24h}
          previousValue={isUpdated ? prevValuesRef.current.priceChange24h : undefined}
        />
      </td>
      <td className="px-4 py-4 text-right">
        <PercentageChange 
          value={asset.priceChange7d}
          previousValue={isUpdated ? prevValuesRef.current.priceChange7d : undefined}
        />
      </td>
      <td className="px-4 py-4 text-right">
        ${formatLargeNumber(asset.marketCap)}
      </td>
      <td className="px-4 py-4 text-right">
        ${formatLargeNumber(asset.volume24h)}
      </td>
      <td className="px-4 py-4 text-right">
        {formatSupply(asset.circulatingSupply, asset.symbol)}
        {asset.maxSupply && (
          <div className="text-xs text-neutral-500">
            Max: {formatLargeNumber(asset.maxSupply)} {asset.symbol}
          </div>
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-center">
          <MiniChart data={asset.chartData} />
        </div>
      </td>
    </tr>
  );
};

export default CryptoTableRow;