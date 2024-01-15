import { getDb } from '../migrations-utils/db';
export const up = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = await getDb();
  const collectionCostumers = db.collection('Customers');
  const costumer = await collectionCostumers
    ?.find({ email: 'joao@teste.com' })
    .toArray();
  const collection = db.collection('Accounts');
  collection.insertOne({
    costumer: costumer[0]._id,
    cardNumber: '6553441321745360',
    accountNumber: 1000121,
    accountNumberDigit: 5,
    password: 'ec7117851c0e5dbaad4effdb7cd17c050cea88cb',
  });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Accounts');
  collection.deleteMany({ accountNumber: 1000121 });
};
