const shortUrl = require('../shortcut');
const testUrl = [
  'https://www.google.com',
  'https://www.facebook.com',
  'https://www.linkedin.com',
  'https://www.amazon.com',
];
const db = require('../../config/mongoose');
// db.once('open', () => {
//   console.log('seeder connect db');
// });
db.once('open', () => {
  console.log('seeder connect db');
  testUrl.forEach((e) => shortUrl.create({ originalUrl: e }));

  console.log('Done');
});
