import Dexie from 'dexie';

const db = new Dexie('protocolDB');



db.version(2).stores({
  medications: '++id, name, dosage, frequency, history, remindersEnabled, startDate, endDate, notes',
  supplements: '++id, name, dosage, frequency, history',
  bowelMovements: '++id, date, time, bristolStoolIndex',
  plugins: '++id, name, enabled, settings',
});

db.on('populate', (transaction) => {
  transaction.plugins.add({ name: 'Avføring', enabled: false, settings: {}})
  transaction.plugins.add({ name: 'Protokoll', enabled: false, settings: {}})
});

export default db;