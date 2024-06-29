const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const net = require('net');
const fs = require('fs');

const app = express();
const port = 3000; // HTTP 服务器端口
const socketPort = 4000; // Socket 服务器端口

// 设置静态文件目录
app.use('/static', serveStatic(path.join(__dirname, 'static')));
console.log('zou ni');

// 创建 TCP 服务器
const server = net.createServer((socket) => {
  console.log('客户端已连接');

  socket.on('data', (data) => {
    const flag = data.toString().trim();
    console.log(`收到数据: ${flag}`);
    // 将数据追加到 flag 文件
    fs.appendFile('flag.txt', `${flag}\n`, (err) => {
      if (err) {
        console.error('写入文件时出错:', err);
      } else {
        console.log('数据已成功追加到文件');
      }
    });
  });

  socket.on('end', () => {
    console.log('客户端已断开连接');
  });

  socket.on('error', (err) => {
    console.error('Socket 错误:', err);
  });
});

// 启动 TCP 服务器
server.listen(socketPort, () => {
  console.log(`Socket 服务器运行在端口 ${socketPort}`);
});

// 启动 HTTP 服务器
app.listen(port, () => {
  console.log(`文件服务器运行在 http://localhost:${port}/static`);
});