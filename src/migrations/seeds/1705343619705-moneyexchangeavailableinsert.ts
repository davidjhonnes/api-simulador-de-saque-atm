import { getDb } from '../../migrations-utils/db';
export const up = async (): Promise<void> => {
  const db = await getDb();
  const collectionAtm = db.collection('Atms');

  const atm = await collectionAtm
    ?.find({ serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp' })
    .toArray();
  const collection = db.collection('MoneyExchangeAvaiables');

  collection.insertOne({
    atm: atm[0]._id,
    registerCode: 'PwljamX1q7GZwRr-V0pqj4yZSQtDwa2-sxzsBhKBv7ffXlC',
    notes10: 1150,
    notes20: 590,
    notes50: 215,
    notes100: 80,
    reloadDateAtm: new Date(),
    _createdAt: new Date(),
    _updatedAt: new Date(),
    isActive: true,
  });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('MoneyExchangeAvaiables');
  collection.deleteMany({
    registerCode: 'PwljamX1q7GZwRr-V0pqj4yZSQtDwa2-sxzsBhKBv7ffXlC',
  });
};
