import { getDb } from '../../migrations-utils/db';
import { generatePassword } from '../../business-use-case/encryption/encrypt.business';
export const up = async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const db = await getDb();
  const collectionCustomers = db.collection('Customers');
  const customer = await collectionCustomers
    ?.find({ email: 'joao@teste.com' })
    .toArray();
  const collection = db.collection('Accounts');
  const pass = await generatePassword('123456');

  collection.insertOne({
    customer: customer[0]._id,
    cardNumber: '6553441321745360',
    cpf: '80906698081',
    accountNumber: 1000121,
    accountNumberDigit: 5,
    currentBalanceAccount: 0.0,
    password: pass,
    _createdAt: new Date(),
    _updatedAt: new Date(),
  });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Accounts');
  collection.deleteMany({ accountNumber: 1000121 });
};
