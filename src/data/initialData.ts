import { CryptoAsset } from '../types/crypto';

// Generate random chart data points (7 data points for 7 days)
const generateChartData = (startValue: number, volatility: number): number[] => {
  const points = [];
  let currentValue = startValue;
  
  for (let i = 0; i < 7; i++) {
    // Random price movement with the given volatility
    const change = currentValue * (Math.random() * volatility * 2 - volatility);
    currentValue += change;
    points.push(Math.max(0, currentValue));
  }
  
  return points;
};

export const initialCryptoData: CryptoAsset[] = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    logoUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    price: 64750.42,
    priceChange1h: 0.43,
    priceChange24h: 0.93,
    priceChange7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85e6,
    maxSupply: 21e6,
    chartData: generateChartData(60000, 0.05),
    lastUpdated: Date.now()
  },
  {
    id: 'ethereum',
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    logoUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    price: 3456.78,
    priceChange1h: 0.60,
    priceChange24h: 3.21,
    priceChange7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71e6,
    maxSupply: null,
    chartData: generateChartData(3000, 0.07),
    lastUpdated: Date.now()
  },
  {
    id: 'tether',
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    logoUrl: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    price: 1.00,
    priceChange1h: 0.00,
    priceChange24h: 0.00,
    priceChange7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27e9,
    maxSupply: null,
    chartData: generateChartData(1, 0.001),
    lastUpdated: Date.now()
  },
  {
    id: 'xrp',
    rank: 4,
    name: 'XRP',
    symbol: 'XRP',
    logoUrl: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    price: 0.58,
    priceChange1h: 0.46,
    priceChange24h: 0.54,
    priceChange7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39e9,
    maxSupply: 100e9,
    chartData: generateChartData(0.55, 0.06),
    lastUpdated: Date.now()
  },
  {
    id: 'bnb',
    rank: 5,
    name: 'BNB',
    symbol: 'BNB',
    logoUrl: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    price: 606.65,
    priceChange1h: 0.09,
    priceChange24h: -1.20,
    priceChange7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89e6,
    maxSupply: 200e6,
    chartData: generateChartData(580, 0.04),
    lastUpdated: Date.now()
  },
  {
    id: 'solana',
    rank: 6,
    name: 'Solana',
    symbol: 'SOL',
    logoUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    price: 151.51,
    priceChange1h: 0.53,
    priceChange24h: 1.26,
    priceChange7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31e6,
    maxSupply: null,
    chartData: generateChartData(145, 0.08),
    lastUpdated: Date.now()
  }
];