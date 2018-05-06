var express = require('express');
var router = express.Router();
/* 引入mongodb模块 */
var mongoose = require('mongoose');
/* 连接数据库 */
mongoose.connect('mongodb://127.0.0.1:27017/p2p', (err) => {
  if (err) {
    console.error("链接错误！" + err.message);
  } else {
    console.log("链接成功！！！！！");
  }
});
/* 定义骨架 */
var usersSchema = new mongoose.Schema({
  username:String,
  password:String,
  email:String,
  mobile:String,
  isActive:Boolean,
  createDate:Date
});
/* 得到骨架模型 */
var usersModel = mongoose.model('users', usersSchema, 'users');

/* 用户注册 route*/
router.post('/join',(req,res)=>{
  // 获取请求中的 值
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  var usersInstance = new usersModel({
    username:username,
    password:password,
    email:email,
    mobile:'',
    isActive:true,
    createDate:new Date().toLocaleString()
  })
  //调用save方法进行保存
  usersInstance.save((err) => {
    if(err){
      console.error("注册失败！"+err.message);
    }else{
      res.json({
        'isSuccess': true,
        'message': '注册成功！'
      })
    }
  });
});
module.exports = router;
