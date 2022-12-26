//////////require//////////
const express = require('express');
const { engine } = require('express-handlebars');
require('./config/mongoose');
const shortUrl = require('./models/shortcut');
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
let originalUrl = '';
let shotrcutUrl = '';
app.get('/', (req, res) => {
  if (originalUrl) {
    shortUrl
      .find({ originalUrl: originalUrl })
      .lean()
      .then((e) => {
        let id = String(e[0]._id).slice(18, 24);
        if (e.length) {
          shotrcutUrl = `http://localhost:3000/${id}`;
        }
        res.render('index', { originalUrl, shotrcutUrl });
        originalUrl = '';
        shotrcutUrl = '';
      })
      .catch((err) => console.log('主頁渲染失敗', err));
  } else {
    res.render('index');
  }
});

app.post('/', (req, res) => {
  originalUrl = req.body.originalUrl;
  //1. 想用axios對伺服器之外的網站發出請求，如果成功下一步是尋找資料庫是否已存在欲查詢之網址
  //記錄一下 我不知道 headers: { "Accept-Encoding": "gzip,deflate,compress" } -> 設定是做什麼的，但可以解決AxiosError: unexpected end of file
  axios
    .get(originalUrl, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    })
    .then(() =>
      //2. 尋找資料庫是否已存在欲查詢之網址
      shortUrl
        .find({ originalUrl: originalUrl })
        .lean()
        .then((e) => {
          if (!e.length) {
            return shortUrl.create({ originalUrl });
          } else {
            console.log('此檔案已存在');
          }
        })
        .then(() => {
          shortUrl
            .findOne({ originalUrl: originalUrl })
            .then((e) => {
              console.log(e);
              let id = String(e._id).slice(18, 24);
              e.shortUrlId = id;
              e.save();
            })
            .catch((err) => console.log('新增短id失敗', err));
        })
        .catch((err) => console.log('重更頁面失敗'))
    )
    .then(() => res.redirect('/')) //3.重更頁面
    .catch((err) => {
      shotrcutUrl = '錯誤';
      res.render('index', { originalUrl, shotrcutUrl });
      console.log('axios失敗', err);
    });
});
//因為query不了objectId的最後六碼因此用shortUrlId紀錄_id最後六碼
app.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  shortUrl
    .findOne({ shortUrlId: id })
    .lean()
    .then((e) => {
      res.redirect(e.originalUrl);
    })
    .catch((err) => console.log('短網址失效', err));
});
app.listen(PORT, () => {
  console.log(`app is listening on http://localhost:${PORT}`);
});
