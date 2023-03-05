// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import get from 'axios'
import { ArsaMarketItemData } from '../types/items';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.debug('[API][get-market] running with params', req.query);
  // query.id = item id
  // query.region = game region
  const market: ArsaMarketItemData = await (await get(`https://api.arsha.io/v2/${req.query.region}/item?id=${req.query.id}&lang=en`)).data;  

  res.status(200).send(market);
}
