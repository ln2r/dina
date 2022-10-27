// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import get from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // query.id = item id
  // query.sid = item sub id
  // query.region = game region
  const historical = await (await get(`https://api.arsha.io/v2/${req.query.region}/history?id=${req.query.id}&sid=${req.query.sid}`)).data;
  
  // TODO: format res as chart

  res.status(200).send(historical as any);
}
