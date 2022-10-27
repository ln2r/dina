// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import get from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // query.id = item id
  // query.region = game region
  const market = await (await get(`https://api.arsha.io/v2/${req.query.region}/item?id=${req.query.id}&lang=en`)).data;  

  res.status(200).send(market as any)
}
