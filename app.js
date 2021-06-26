

// app.js
// 后端对服务器代码的入口文件
// 我们会在该文件中监听网络（端口）
// 当有客户端请求了，那么久返回对应的数据

const { log } = require('console');
const http = require('http');
const fs = require('fs');
// 创建服务器对象
const server = http.createServer((req, res) => {
  //只要有请求，那么函数就会被执行
  // console.log('路径', req.url);

  // 对静态资源内容进行处理
  if (req.url.startsWith('/static')) {

    // 根据规则找到服务器中指定的文件
    let file = __dirname + req.url;
    let content = '';
    try {
      content = fs.readFileSync(file);
      // mime  根据文件后缀设置请求头参数
      // let last = file.lastIndexOf('.');
      // let ext = file.substring(last);
      // let fileMime = mime[ext];
      res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8'
      })
    } catch (e) {
      content = fs.readFileSync('./template/404.html');
      res.writeHead(404, {
        'Content-Type': 'text/html;charset=utf-8'
      })
    }
    res.write(content);
    res.end();
    return;
  }

  // switch (req.url) {
  //   case '/':
  //     let content = fs.readFileSync('./template/index.html');
  //     res.write(content);
  // }
  // res.write('Hello kkb!');
  // res.end();
});

server.listen(3000);