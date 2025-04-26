// Format a number as currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value >= 1 ? 2 : 6,
    maximumFractionDigits: value >= 1 ? 2 : 6,
  }).format(value);
};

// Format large numbers with abbreviations (K, M, B, T)
export const formatLargeNumber = (value: number): string => {
  if (value === 0) return '0';
  
  const abbreviations = ['', 'K', 'M', 'B', 'T'];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
  
  if (tier === 0) return value.toString();
  
  const suffix = abbreviations[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = value / scale;
  
  return scaled.toFixed(2) + suffix;
};

// Format a percentage with + sign for positive values
export const formatPercentage = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

// Format cryptocurrency supply
export const formatSupply = (value: number, symbol: string): string => {
  return `${formatLargeNumber(value)} ${symbol}`;
};

// Determine CSS class based on percentage value (positive or negative)
export const getPercentageColorClass = (value: number): string => {
  if (value > 0) return 'text-success-500';
  if (value < 0) return 'text-danger-500';
  return 'text-neutral-500';
};