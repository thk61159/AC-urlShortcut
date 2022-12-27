//////////require//////////
const express = require('express');
const { engine } = require('express-handlebars');
require('./config/mongoose');
const shortUrl = require('./models/shortcut');

const routes = require('./routes/index')
//////////setting//////////
const app = express();
const PORT = 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
//////////controller//////////
app.use(routes);
app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
