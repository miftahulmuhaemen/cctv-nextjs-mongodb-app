import { ValidateProps } from '@/api-lib/constants';
import { findFloorsByBuilding, insertFloor, updateFloorById } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const floors = await findFloorsByBuilding(
    db,
    req.query.buildingId,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );

  res.json({ floors });
});

handler.patch(...auths,
  validateBody({
    type: 'object',
    properties: {
      buildingId: ValidateProps.floor.buildingId,
      cameraIPs: ValidateProps.floor.cameraIPs,
      isFullSize: ValidateProps.floor.isFullSize,
    },
    required: ['name', 'buildingId', 'cameraIPs'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const floor = await updateFloorById(db, {
      id: req.body.id,
      name: req.body.name,
      buildingId: req.body.buildingId,
      cameraIPs: req.body.cameraIPs,
      isFullSize: req.body.isFullSize,
    });

    return res.json({ floor });
  });

handler.post(
  ...auths,
  validateBody({
    type: 'object',
    properties: {
      name: ValidateProps.floor.name,
      buildingId: ValidateProps.floor.buildingId,
      cameraIPs: ValidateProps.floor.cameraIPs,
      isFullSize: ValidateProps.floor.isFullSize,
    },
    required: ['name', 'buildingId', 'cameraIPs'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).end();
    }

    const db = await getMongoDb();
    const floor = await insertFloor(db, {
      name: req.body.name,
      buildingId: req.body.buildingId,
      cameraIPs: req.body.cameraIPs,
      isFullSize: req.body.isFullSize,
    });

    return res.json({ floor });
  }
);

export default handler;
