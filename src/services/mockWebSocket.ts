import { CryptoAsset } from '../types/crypto';
import { updateCryptoData } from '../store/slices/cryptoSlice';
import { AppDispatch } from '../store';

export class MockWebSocketService {
  private intervalId: number | null = null;
  private dispatch: AppDispatch;
  private assets: CryptoAsset[];

  constructor(dispatch: AppDispatch, initialAssets: CryptoAsset[]) {
    this.dispatch = dispatch;
    this.assets = [...initialAssets];
  }

  // Start the mock WebSocket service
  start(intervalMs: number = 2000): void {
    if (this.intervalId !== null) {
      this.stop();
    }

    this.intervalId = window.setInterval(() => {
      this.generatePriceUpdates();
    }, intervalMs);
  }

  // Stop the mock WebSocket service
  stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Generate random price updates
  private generatePriceUpdates(): void {
    const updatedAssets = this.assets.map(asset => {
      // Random price change within a realistic range
      const priceVolatility = this.getVolatilityForAsset(asset.symbol);
      const priceChange = asset.price * (Math.random() * priceVolatility * 2 - priceVolatility);
      const newPrice = Math.max(0.0001, asset.price + priceChange);

      // Random percentage changes
      const newPriceChange1h = this.getRandomPercentageChange(asset.priceChange1h, 0.1);
      const newPriceChange24h = this.getRandomPercentageChange(asset.priceChange24h, 0.2);
      const newPriceChange7d = this.getRandomPercentageChange(asset.priceChange7d, 0.3);

      // Random volume change
      const volumeChange = asset.volume24h * (Math.random() * 0.04 - 0.02);
      const newVolume = Math.max(1000, asset.volume24h + volumeChange);

      // Update the chart data by adding the new price at the end and removing the first element
      const newChartData = [...asset.chartData.slice(1), newPrice];

      return {
        ...asset,
        price: newPrice,
        priceChange1h: newPriceChange1h,
        priceChange24h: newPriceChange24h,
        priceChange7d: newPriceChange7d,
        volume24h: newVolume,
        chartData: newChartData,
        lastUpdated: Date.now()
      };
    });

    // Update our local copy of assets
    this.assets = updatedAssets;
    
    // Dispatch the update to Redux
    this.dispatch(updateCryptoData(updatedAssets));
  }

  // Get different volatility levels for different assets
  private getVolatilityForAsset(symbol: string): number {
    switch (symbol) {
      case 'BTC':
        return 0.002; // 0.2%
      case 'ETH':
        return 0.003; // 0.3%
      case 'USDT':
        return 0.0001; // 0.01% (stablecoin)
      case 'SOL':
        return 0.005; // 0.5%
      default:
        return 0.004; // 0.4%
    }
  }

  // Generate a random percentage change based on the current value
  private getRandomPercentageChange(currentPercentage: number, maxChange: number): number {
    const change = (Math.random() * maxChange * 2) - maxChange;
    return parseFloat((currentPercentage + change).toFixed(2));
  }
}