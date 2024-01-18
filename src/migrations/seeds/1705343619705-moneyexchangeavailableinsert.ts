import { getDb } from '../../migrations-utils/db';
export const up = async (): Promise<void> => {
  const db = await getDb();
  const collectionAtm = db.collection('Atms');

  const atm = await collectionAtm
    ?.find({ serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp' })
    .toArray();
  const collection = db.collection('MoneyExchangeAvaiables');

  const money = await collection.insertOne({
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

  const atm2 = await collectionAtm
    ?.find({ serialCode: 'er41w5-4faw3t-4rf15t-5tq231-t43ds' })
    .toArray();
  const collection2 = db.collection('MoneyExchangeAvaiables');

  const money2 = await collection2.insertOne({
    atm: atm2[0]._id,
    registerCode: 'frqw24rt1adf41w-r412efr31hjt51-t51gh3rttaa22b',
    notes10: 850,
    notes20: 390,
    notes50: 115,
    notes100: 40,
    reloadDateAtm: new Date(),
    _createdAt: new Date(),
    _updatedAt: new Date(),
    isActive: true,
  });

  console.log(money, money2);
  await collectionAtm?.updateOne(
    { _id: atm[0]._id },
    { $set: { moneyAvailable: money.insertedId } },
  );
  await collectionAtm?.updateOne(
    { _id: atm2[0]._id },
    { $set: { moneyAvailable: money2.insertedId } },
  );
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('MoneyExchangeAvaiables');
  collection.deleteMany({
    registerCode: 'PwljamX1q7GZwRr-V0pqj4yZSQtDwa2-sxzsBhKBv7ffXlC',
  });
};
