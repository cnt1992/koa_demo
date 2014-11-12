/**
 * Module dependencies.
 */
var route = require('./controller/route'),
   logger = require('koa-logger'),
    parse = require('co-body'),
     path = require('path'),
      app = require('koa')();

// 开发环境下在控制台记录请求的路径以及时间等,写在声明完所有变量之后
if (app.env === 'development') {
    app.use(logger());
}

// 静态资源配置
app.use(require('koa-static')(__dirname + '/public'));

// 总路由
route(app);

// 错误处理
app.use(function *(next){
    try {
        yield next;
    } catch (err) {
        this.status = err.status || 500;
        this.type = 'html';
        this.body = '<p>页面出错了...</p>';

        this.app.emit('error', err, this);
    }
});

// error handler
app.on('error', function(err){
    if (process.env.NODE_ENV != 'prd') {
        console.log('sent error %s to the cloud', err.message);
        console.log(err);
    }
});


// listen
app.listen(3000,function () {console.log('listening on port 3000');});



