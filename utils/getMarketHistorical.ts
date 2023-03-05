import axios from 'axios'

export const getMarketHistorical = async (url: string) => {
  return (await (axios.get(url))).data;
}