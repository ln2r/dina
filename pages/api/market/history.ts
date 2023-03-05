// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import get from 'axios'
import { ArsaMarketHistoricalData } from '../types/historical';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.debug('[API][get-market-history] running with params', req.query);
  // query.id = item id
  // query.sid = item sub id
  // query.region = game region
  const historical: ArsaMarketHistoricalData = await (await get(`https://api.arsha.io/v2/${req.query.region}/history?id=${req.query.id}&sid=${req.query.sid}`)).data;
  const labels: string[] = Object.keys(historical.history).map((timeData:string) => {
    return new Date(parseInt(timeData)).toLocaleTimeString();
  });

  res.status(200).send({
    labels,
    datasets: [
      {
        label: 'Price',
        data: Object.values(historical.history),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  });
}
