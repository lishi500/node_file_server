const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');

const app = express();
const port = 3000; // 你可以选择其他端口

// 设置静态文件目录
app.use('/static', serveStatic(path.join(__dirname, 'static')));

app.listen(port, () => {
  console.log(`文件服务器运行在 http://localhost:${port}/static`);
});