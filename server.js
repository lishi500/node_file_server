const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // 你可以选择其他端口

// 设置静态文件目录
app.use('/static', serveStatic(path.join(__dirname, 'static')));

// 使用 bodyParser 来解析 POST 请求体
app.use(bodyParser.urlencoded({ extended: true }));

// 接收来自 Android 应用的 POST 请求
app.post('/submit_flag', (req, res) => {
  const flag = req.body.flag;
  console.log(`收到 flag: ${flag}`);

  // 将 flag 追加到文件
  fs.appendFile('flag', `${flag}\n`, (err) => {
    if (err) {
      console.error('写入文件时出错:', err);
      res.status(500).send('服务器错误');
    } else {
      console.log('flag 已成功追加到文件');
      res.status(200).send('flag 已收到');
    }
  });
  res.send('flag 已收到' + flag);
});

// 启动 HTTP 服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});