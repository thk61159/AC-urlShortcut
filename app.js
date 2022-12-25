//////////require//////////
const express = require('express');
const { engine } = require('express-handlebars');
require('./config/mongoose');
const shortUrl = require('./models/shourcut');
const axios = require('axios');
//////////setting//////////
const app = express();
const PORT = 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//////////controller//////////
app.get('/', (req, res) => res.render('index'));
app.post('/', (req, res) => {
  // console.log(req);
  const originalUrl = req.body.originalUrl;
  let statusCode;
  let error = false;

  axios
    .get(originalUrl)
    .then((res) => {
      statusCode = res.status;
      console.log(statusCode);
    })
    .catch((err) => {
      error = true;
      console.log(err);
    });

  shortUrl
    .findOne({ originalUrl: originalUrl })
    .lean()
    .then((e) => {
      console.log(e);
      e || shortUrl.create({ originalUrl });
    })
    .then(() => {
      if (statusCode === 200) {
        res.render('index', { originalUrl });
      } else {
        res.render('index', { originalUrl, error });
      }
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
