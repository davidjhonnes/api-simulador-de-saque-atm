import { getDb } from '../../migrations-utils/db';
export const up = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = await getDb();
  const collectionCustomers = db.collection('Customers');
  const customer = await collectionCustomers
    ?.find({ email: 'joao@teste.com' })
    .toArray();
  const collection = db.collection('Accounts');
  collection.insertOne({
    customer: customer[0]._id,
    cardNumber: '6553441321745360',
    accountNumber: 1000121,
    accountNumberDigit: 5,
    currentBalanceAccount: 0.0,
    password: 'ec7117851c0e5dbaad4effdb7cd17c050cea88cb',
    _createdAt: new Date(),
    _updatedAt: new Date(),
  });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Accounts');
  collection.deleteMany({ accountNumber: 1000121 });
};
