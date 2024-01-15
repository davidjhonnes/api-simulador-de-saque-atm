import { getDb } from '../migrations-utils/db';
export const up = async (): Promise<void> => {
  const db = await getDb();
  const collectionC = db.collection('Customers');
  collectionC.insertOne({
    name: 'João',
    lastName: 'Teste Cliente',
    dateBirthDay: '28/11/1987',
    phone: '11988811444',
    email: 'joao@teste.com',
    addressStreet: 'rua 11 de março',
    addressNumber: '12B',
    addressNeighborhood: 'Centro',
    addressComplement: 'CONJUNTO 2',
    addressCity: 'São Paulo',
    addressUF: 'SP',
    addressCountry: 'BR',
  });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Customers');
  collection.deleteMany({ email: 'joao@teste.com' });
};
