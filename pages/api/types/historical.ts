export type ArsaMarketHistoricalData = {
  id: number;
  sid: number;
  history: {
    [timestamp: string]: number;
  }
}