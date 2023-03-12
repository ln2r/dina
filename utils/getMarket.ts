import axios from "axios"

export const getMarketData = async (id: number) => {
  try {
    const response = await axios.get(`/api/market?region=na&id=${id}`);
    const data = await response.data;
    
    return data;
  } catch (err) {
    throw err;
  }
};