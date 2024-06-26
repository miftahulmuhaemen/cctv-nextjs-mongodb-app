import { ValidateProps } from '@/api-lib/constants';
import { findFloors, deleteFloorById, findFloorsWithBuilding } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const floors = await findFloors(
    db,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ floors });
});

handler.delete(async (req, res) => {
  const db = await getMongoDb();
  await deleteFloorById(
    db,
    req.body.id
  );

  res.json({ 
    status: '200',
   });
})

export default handler;
