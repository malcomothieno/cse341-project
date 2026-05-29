require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');

const directors = [
  { firstName: 'Christopher', lastName: 'Nolan', nationality: 'British-American', birthYear: 1970, knownFor: 'Inception, The Dark Knight, Interstellar' },
  { firstName: 'Ava', lastName: 'DuVernay', nationality: 'American', birthYear: 1972, knownFor: 'Selma, A Wrinkle in Time, 13th' },
  { firstName: 'Bong', lastName: 'Joon-ho', nationality: 'South Korean', birthYear: 1969, knownFor: 'Parasite, Snowpiercer, Memories of Murder' },
];

const movies = [
  { title: 'Inception', genre: 'Sci-Fi', releaseYear: 2010, rating: 8.8, durationMinutes: 148, language: 'English', synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.', directorName: 'Christopher Nolan' },
  { title: 'The Dark Knight', genre: 'Action', releaseYear: 2008, rating: 9.0, durationMinutes: 152, language: 'English', synopsis: 'Batman faces the Joker, a criminal mastermind who plunges Gotham into anarchy.', directorName: 'Christopher Nolan' },
  { title: 'Selma', genre: 'Drama', releaseYear: 2014, rating: 7.5, durationMinutes: 128, language: 'English', synopsis: 'The story of the 1965 Selma to Montgomery voting rights marches led by James Bevel and Martin Luther King Jr.', directorName: 'Ava DuVernay' },
  { title: 'Parasite', genre: 'Thriller', releaseYear: 2019, rating: 8.6, durationMinutes: 132, language: 'Korean', synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.', directorName: 'Bong Joon-ho' },
  { title: 'Interstellar', genre: 'Sci-Fi', releaseYear: 2014, rating: 8.6, durationMinutes: 169, language: 'English', synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', directorName: 'Christopher Nolan' },
];

async function seed() {
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || 'movieDB');

    // Clear existing data
    await db.collection('directors').deleteMany({});
    await db.collection('movies').deleteMany({});

    const dirResult = await db.collection('directors').insertMany(directors);
    console.log(`Inserted ${dirResult.insertedCount} directors`);

    const movResult = await db.collection('movies').insertMany(movies);
    console.log(`Inserted ${movResult.insertedCount} movies`);

    console.log('\nSample IDs for testing:');
    console.log('Directors:', Object.values(dirResult.insertedIds).map(id => id.toString()));
    console.log('Movies:', Object.values(movResult.insertedIds).map(id => id.toString()));
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
