require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');

const contacts = [
  { firstName: 'James', lastName: 'Carter', email: 'james.carter@example.com', favoriteColor: 'Navy Blue', birthday: '1990-06-15' },
  { firstName: 'Sophia', lastName: 'Nkemdirim', email: 'sophia.nkemdirim@example.com', favoriteColor: 'Emerald Green', birthday: '1997-11-03' },
  { firstName: 'David', lastName: 'Omondi', email: 'david.omondi@example.com', favoriteColor: 'Crimson', birthday: '1993-02-28' },
  { firstName: 'Amara', lastName: 'Mensah', email: 'amara.mensah@example.com', favoriteColor: 'Gold', birthday: '1995-08-19' },
  { firstName: 'Brian', lastName: 'Mwangi', email: 'brian.mwangi@example.com', favoriteColor: 'Orange', birthday: '1988-07-10' },
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || 'contactsDB');

    await db.collection('contacts').deleteMany({});
    const result = await db.collection('contacts').insertMany(contacts);
    console.log(`Inserted ${result.insertedCount} contacts`);
    console.log('IDs:', Object.values(result.insertedIds).map(id => id.toString()));
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
