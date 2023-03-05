// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../utils/getDatabase'
import get from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.debug('[API][get-items] running with params', req.query);
  // query.name = item name
  // query.limit = return limit
  // query.id = item id
  const result:any[] | unknown = req.query.id 
    ? 
      (await get(`https://api.arsha.io/v2/${req.query.region}/item?id=${req.query.id}`)).data
    : 
      await getDatabase(
        `SELECT * FROM items WHERE name LIKE "%${req.query.name}%"${req.query.limit ? ` LIMIT ${req.query.limit}` : ''};`
      );

  res.status(200).send(result)
}
