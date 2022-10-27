import { NextApiRequest, NextApiResponse } from 'next';
import { syncDatabase } from '../../../utils/syncDatabase';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {      
        syncDatabase('items');
        syncDatabase('recipes');
        syncDatabase('mrecipes');

        res.status(200).send({
          status: true,
        });
      } catch (err) {
        console.error(err);
      }
  }
}