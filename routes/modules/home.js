const express = require('express');
const router = express.Router();
const axios = require('axios');
const shortUrl = require('../../models/shortcut');
const home = process.env.HOMEPAGE




router.get('/', (req, res) => {
  let originalUrl = req.query.originalUrl
  let shotrcutUrl = '';
  if (originalUrl) {
    shortUrl
      .find({ originalUrl: originalUrl })
      .lean()
      .then((e) => {
        let id = String(e[0]._id).slice(19, 24);
       
        if (e.length) {
        shotrcutUrl = `${home}${id}`
        }
        res.render('index', { originalUrl, shotrcutUrl });
      })
      .catch((err) => console.log('主頁渲染失敗', err));
  } else {
    res.render('index');
  }
});

router.post('/', (req, res) => {
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
          //如果沒資料則新增資料到資料庫
          if (!e.length) {
            return shortUrl.create({ originalUrl });
          } else {
            console.log('此檔案已存在');
          }
        })
        .then(() => {
          //利用新增完的資料_id末六碼
          shortUrl
            .findOne({ originalUrl: originalUrl })
            .then((e) => {
              if (!e.shortUrlId) {
                let id = String(e._id).slice(19, 24);
                e.shortUrlId = id;
                e.save();
              }
            })
            .catch((err) => console.log('新增短id失敗', err));
        })
        .catch((err) => console.log('重更頁面失敗'))
    )
    .then(() => res.redirect(`/?originalUrl=${originalUrl}`)) //3.重更頁面
    .catch((err) => {
      //如果是無法連線的網址render畫面提示錯誤
      let wrongUrl = 'wrongUrl';
      res.render('index', { originalUrl, wrongUrl });
      console.log('axios失敗', err);
    });
});
//因為query不了objectId的最後六碼因此用shortUrlId紀錄_id最後六碼
router.get('/:id', (req, res) => {
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

module.exports = router;
