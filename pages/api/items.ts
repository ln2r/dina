// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getDatabase } from '../../utils/getDatabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // query.name = item name
  // query.limit = return limit
  // query.id = item id
  const db = req.query.id
    ?
      await getDatabase(
        `SELECT * FROM items WHERE id = ${req.query.id} ;`
      )
    :
      await getDatabase(
        `SELECT * FROM items WHERE name LIKE "%${req.query.name}%"${req.query.limit ? ` LIMIT ${req.query.limit}` : ''};`
      );

  res.status(200).send(db as any)
}
