import axios from "axios"

export const getMarket = async (url: string) => {
  return (await (axios.get(url))).data;
}