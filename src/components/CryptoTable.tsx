import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortedCryptoAssets } from '../store/slices/cryptoSlice';
import { AppDispatch } from '../store';
import { MockWebSocketService } from '../services/mockWebSocket';
import { initialCryptoData } from '../data/initialData';
import CryptoTableRow from './CryptoTableRow';
import CryptoTableHeader from './CryptoTableHeader';
import { SortKey } from '../types/crypto';

// Define the columns configuration
const columns = [
  { key: 'rank' as SortKey, label: '#', className: 'w-12' },
  { key: 'name' as SortKey, label: 'Name', className: 'min-w-[200px]' },
  { key: 'price' as SortKey, label: 'Price', className: 'min-w-[120px]' },
  { 
    key: 'priceChange1h' as SortKey, 
    label: '1h %', 
    className: 'min-w-[80px] text-right'
  },
  { 
    key: 'priceChange24h' as SortKey, 
    label: '24h %', 
    className: 'min-w-[80px] text-right'
  },
  { 
    key: 'priceChange7d' as SortKey, 
    label: '7d %', 
    className: 'min-w-[80px] text-right'
  },
  { 
    key: 'marketCap' as SortKey, 
    label: 'Market Cap', 
    className: 'min-w-[130px] text-right',
    tooltip: 'Market Cap = Current Price x Circulating Supply'
  },
  { 
    key: 'volume24h' as SortKey, 
    label: 'Volume (24h)', 
    className: 'min-w-[130px] text-right',
    tooltip: 'The total value of all trades in the last 24 hours'
  },
  { 
    key: 'circulatingSupply' as SortKey, 
    label: 'Circulating Supply', 
    className: 'min-w-[150px] text-right',
    tooltip: 'The amount of coins currently circulating in the market'
  },
  { 
    key: 'chart' as SortKey, 
    label: 'Last 7 Days', 
    className: 'min-w-[120px]',
    sortable: false
  }
];

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cryptoAssets = useSelector(selectSortedCryptoAssets);
  const mockWebSocketRef = useRef<MockWebSocketService | null>(null);
  
  // Start mock WebSocket on component mount
  useEffect(() => {
    mockWebSocketRef.current = new MockWebSocketService(dispatch, initialCryptoData);
    mockWebSocketRef.current.start(2000); // Update every 2 seconds
    
    return () => {
      if (mockWebSocketRef.current) {
        mockWebSocketRef.current.stop();
      }
    };
  }, [dispatch]);
  
  return (
    <div className="overflow-x-auto w-full shadow-lg rounded-lg bg-white">
      <table className="w-full min-w-[900px] border-collapse">
        <thead className="bg-neutral-50 border-b border-neutral-200">
          <tr>
            {columns.map((column) => (
              <CryptoTableHeader key={column.key} column={column} />
            ))}
          </tr>
        </thead>
        <tbody>
          {cryptoAssets.map((asset, index) => (
            <CryptoTableRow 
              key={asset.id} 
              asset={asset}
              isEven={index % 2 === 0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;