var express = require('express');
var router = express.Router();
/* 引入mongodb模块 */
// var mongooes = require('mongoose');
/* 连接数据库 */

/* 定义骨架 */
// var joinsSchema = new mongooes.Schema({
//   username:String,
//   password:String,
//   email:String
// });
/* 得到骨架模型 */
// var joinsModel = mongooes.model('joins',joinsSchema,'joins');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* 用户注册 route*/
router.post('/register',(req,res)=>{
  // 获取请求中的 值
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  //调用save方法进行保存

  res.json({'isSuccess': true,'message':'这是响应的结果'})
});
module.exports = router;
