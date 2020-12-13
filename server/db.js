const MongoClient = require('mongodb').MongoClient;

// Bad practice: don't keep sensitive data in git
const CONFIG = {
  USER: 'Andrei',
  PASS: 'MWJjBwlFx8lnad4K',
  URL: 'cluster0.y2zdi.mongodb.net',
  DB: 'app',
};

const uri = `mongodb+srv://${encodeURIComponent(CONFIG.USER)}:${encodeURIComponent(CONFIG.PASS)}@${
  CONFIG.URL
}/`;
const client = new MongoClient(uri, { useUnifiedTopology: true });
module.exports = { client };

client
  .connect()
  .then(() => console.log('MongoDB Connected'))
  .catch(error => console.error('Error on connecting to MongoDB server', error))
  .then(() => {
    const movies = client.db(CONFIG.DB).collection('movies');   
    const users = client.db(CONFIG.DB).collection('users');   
    
    module.exports.users = users;
    module.exports.movies = movies;
     
  });

