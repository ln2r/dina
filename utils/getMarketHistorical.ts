import axios from 'axios'

export const getHistoricalData = async (id: number, sid?: number) => {
  try {
    const response = await axios.get(`/api/market/history?region=na&id=${id}&sid=${sid ? sid : 0}`);
    const data = await response.data;
    
    return data;
  } catch (err) {
    throw err;
  }
};