var express = require('express');
var router = express.Router();
/* 引入mongodb模块 */
var mongoose = require('mongoose');
/* 引入cookie */
var cookie = require('cookie');
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
  var usersObj ={username}
  var usersInstance = new usersModel({
    username:username,
    password:password,
    email:email,
    mobile:'',
    isActive:true,
    createDate:new Date().toLocaleString()
  })
  usersModel.find(usersObj,(err,data)=>{
    // console.log(data);
    if(!err){
        //调用save方法进行保存
        usersInstance.save((err) => {
          if (err) {
            console.error("注册失败！" + err.message);
          } else {
            res.json({
              'isSuccess': true,
              'message': '注册成功！'
            })
          }
        });
    }else{
      throw err;
    }
  });
});
/* username是否重复验证 */
router.post('/isName',(req,res)=>{
  var username = req.body.username;
  var userObj = {username}
  // console.log(username);
  usersModel.find(userObj,(err,data)=>{
    console.log(data);
    if(!err){
      if(data.length > 0){
        res.json({
          'isSuccess': false,
          'message': '用户名已经存在!'
        })
      }
    }else{
      throw err;
    }
  })
});
/* 用户登录验证 */
router.post('/login',(req,res)=>{
  var username = req.body.username;
  var password = req.body.password;
  var userObj = {username,password};
  // console.log(userObj);
  usersModel.find(userObj,(err,usersData)=>{
    // console.log(usersData);
    if(!err){
      if (usersData.length > 0) {
        //获取用户登录信息写入cookie
        res.cookie('userId',usersData[0]._id);
        res.cookie('usernameCookie',username);
        res.json({
          'isSuccess': true,
          'message': '登录成功！'
        });
      }else{
        res.json({
          'isSuccess': false,
          'message': '登录失败！'
        });
      }
    }else{
      throw err;
    }
  });
});
//user Cookie
router.get('/checkUser', (req, res) => {
  //获取cookie
  var userId = req.cookies.userId;
  var usernameCookie = req.cookies.usernameCookie;
  if (userId && usernameCookie) {
    res.send(true);
  }else{
    res.send(false);
  }
});
//user outCookie
router.get('/outUser',(req,res)=>{
  var userId = req.cookies.userId;
  var usernameCookie = req.cookies.usernameCookie;
  if (userId && usernameCookie) {
    //删除cookie
    res.clearCookie('userId');
    res.clearCookie('usernameCookie');
    res.send(true);
  }
});
//显示用户名
router.get('/disName',(req,res)=>{
  var usernameCookie = req.cookies.usernameCookie;
  if (usernameCookie){
    res.json({usernameCookie});
  }
})
module.exports = router;
