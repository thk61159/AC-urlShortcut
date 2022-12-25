//////////require//////////
const express = require('express');
const { engine } = require('express-handlebars');
require('./config/mongoose');

//////////setting//////////
const app = express();
const PORT = 3000;
app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));
//////////controller//////////
app.get('/', (req, res) => res.render('index'));

app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
