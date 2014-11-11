var koa = require('koa');
var app = module.exports = koa();

app.use(function *(){
  this.body = 'hello world';
});

if(!module.parent){
  app.listen(3000,function(){console.log('app listen on 3000')});
}
