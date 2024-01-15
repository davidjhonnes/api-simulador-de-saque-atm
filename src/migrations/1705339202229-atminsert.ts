import { getDb } from '../migrations-utils/db';
export const up = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Atms');

  collection.insertOne({
    serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp',
    name: 'CAIXA ELETRÔNICO: SHOPPING EL DOURADO',
    address: 'RUA ALBERT EINSTEIN, 2300, PINHEIROS',
    cep: '05441-555',
    city: 'SÃO PAULO',
    uf: 'SP',
    country: 'BR',
    isActive: true,
  });
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Atms');
  collection.deleteMany({ serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp' });
};
