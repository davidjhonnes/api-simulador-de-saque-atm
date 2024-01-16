import { getDb } from '../../migrations-utils/db';
export const up = async (): Promise<void> => {
  const db = await getDb();
  const collectionAtm = db.collection('Atms');
  const collectionAccount = db.collection('Accounts');
  let account = await collectionAccount
    .find({ accountNumber: 1000121 })
    .toArray();
  const atm = await collectionAtm
    ?.find({ serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp' })
    .toArray();
  const collection = db.collection('Transactions');

  await collection.insertOne({
    account: account[0]._id,
    accountNumber: account[0].accountNumber,
    originTransaction: 'atm',
    atm: atm[0]._id,
    typeTransaction: 'credit',
    value: 10000.0,
    balanceInCurrentLine: 10000.0,
    dateTransaction: new Date(),
    isValid: true,
    _createdAt: new Date(),
    _updatedAt: new Date(),
  });

  account = await collectionAccount.updateOne(
    { _id: account[0]._id },
    { $set: { currentBalanceAccount: 10000.0 } },
  );
  console.log('first transaction and updated balance account', account);
};

export const down = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = await getDb();
  const collection = db.collection('Transactions');
  collection.deleteMany({ accountNumber: 1000121 });
};
