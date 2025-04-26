export interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  priceChange1h: number;
  priceChange24h: number;
  priceChange7d: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  maxSupply: number | null;
  chartData: number[];
  lastUpdated: number;
}

export type SortKey = 
  | 'rank' 
  | 'name' 
  | 'price' 
  | 'priceChange1h' 
  | 'priceChange24h' 
  | 'priceChange7d' 
  | 'marketCap' 
  | 'volume24h' 
  | 'circulatingSupply';

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  key: SortKey;
  direction: SortDirection;
}

export interface CryptoState {
  assets: CryptoAsset[];
  loading: boolean;
  error: string | null;
  sortState: SortState;
}