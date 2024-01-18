import { getDb } from '../../migrations-utils/db';
export const up = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Atms');

  collection.insertMany([
    {
      serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp',
      name: 'CAIXA ELETRÔNICO: SHOPPING EL DOURADO',
      address: 'RUA ALBERT EINSTEIN, 2300, PINHEIROS',
      cep: '05441-555',
      city: 'SÃO PAULO',
      uf: 'SP',
      country: 'BR',
      isActive: true,
      _createdAt: new Date(),
      _updatedAt: new Date(),
    },
    {
      serialCode: 'er41w5-4faw3t-4rf15t-5tq231-t43ds',
      name: 'CAIXA ELETRÔNICO: SHOPPING PINHEIROS',
      address: 'AV REBOLSAS 2315, PINHEIROS',
      cep: '01241-543',
      city: 'SÃO PAULO',
      uf: 'SP',
      country: 'BR',
      isActive: true,
      _createdAt: new Date(),
      _updatedAt: new Date(),
    },
  ]);
};

export const down = async (): Promise<void> => {
  const db = await getDb();
  const collection = db.collection('Atms');
  collection.deleteMany({ serialCode: '48YTcy-4RHjmc-5zkqIM-dqKV76-gGe2pp' });
  collection.deleteMany({ serialCode: 'er41w5-4faw3t-4rf15t-5tq231-t43ds' });
};
