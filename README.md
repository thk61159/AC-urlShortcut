# 短網址產生器
利用node.js打造短網址產生器，只要輸入正確的網址，就能將網址縮短，同時也能檢驗有效網址，縮短的網址也能夠長期重複使用。

## 功能
1. 短網址產生器
2. 有效網址確認
3. 有效網頁確認
4. 重複使用

## 使用介面
![alt 使用介面圖示](https://raw.githubusercontent.com/thk61159/AC-urlShortcut/main/urlShortcut%20user%20interface.png "短網址產生器使用介面")

## 如何使用
1. 開啟終端機(terminal)，輸入如下將專案複製到電腦中
```shell
 git clone https://github.com/thk61159/AC-urlShortcut.git
```
2. 至MongoDB建立帳號並安裝MongoDB Atlas及Robo 3T
MONGODB_URI=mongodb+srv://使用者帳號:使用者密碼@資料庫伺服器位置ip/你建立的資料庫名稱?retryWrites=true&w=majority
3. 利用Robo 3T建立欲使用資料庫
4. 進入此專案資料夾，安裝各種套件
```shell
 cd urlShortcut
 npm install -g nodemon //只需安裝一次
 npm install express@4.16.4
 npm i express-handlebars@6.0.6
 npm i mongoose@5.9.7
 npm i dotenv -D
 npm install axios

```
5. 建立.env檔並輸入
MONGODB_URI=mongodb+srv://使用者帳號:使用者密碼@資料庫伺服器位置ip/你建立的資料庫名稱?retryWrites=true&w=majority
6. 新增種子資料(可省略)
```shell
node models/seeds/shortcutSeeder.js
```
3. 運行URL SHORTCUT
```shell
 nodemon app.js
```
4. 拜訪URL SHORTCUT網頁
```shell
 http://localhost:3000/
```

##開發工具
* Visual Studio Code 
* Node.js v14.16.0
* Express.js v4.16.4
* Express-handlebars v6.0.6
* MongoDB
* mongoose v5.9.7
* https://bootswatch.com/journal/


