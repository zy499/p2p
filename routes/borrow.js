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
var borrowsSchema = new mongoose.Schema({
  borrowMoney: Number,
  borrowRate: Number,
  borrowTerm: Number,
  repayment: String,
  minMoney: Number,
  maxMoney: Number,
  borrowBonus: Number,
  borrowDays: Number,
  borrowTitle: String,
  borrowDetails: String,
  borrowType: String,
  borrowPerson: String,
  borrowDate: Date,
  isPass: Boolean,
  passDatetime: Date,
  investMoney: Number,
  isComplated: Boolean
});
/* 得到骨架模型 */
var borrowsModel = mongoose.model('borrows', borrowsSchema, 'borrows');

/*
 借款金额 borrowMoney   或者  b_money
 借款利息 borrowRate
 借款期限 borrowTerm
 还款方式 repayment
 最小投标 minMoney
 最大投标 maxMoney
 投标奖金 borrowBonus
 招标天数 borrowDays
 借款标题 borrowTitle
 借款描述 borrowDetails

 增加的元素：
 借款类型： 下拉列表   borrowType
 借款日期： 日历可选   borrowDate
 借款人： 登录的用户名，只读readonly      borrowPerson

 是否通过审核 isPass
 通过审核日期 passDatetime
 已投资金额 investMoney
 是否满标 isComplated 默认值是false，满标时改写为true
 */
router.post("/add", function (req, res) {
  //1. 接收数据
  var borrowMoney = req.body.borrowMoney;
  var borrowRate = req.body.borrowRate;
  var borrowTerm = req.body.borrowTerm;
  var repayment = req.body.repayment;
  var minMoney = req.body.minMoney;
  var maxMoney = req.body.maxMoney;
  var borrowBonus = req.body.borrowBonus;
  var borrowDays = req.body.borrowDays;
  var borrowTitle = req.body.borrowTitle;
  var borrowDetails = req.body.borrowDetails;
  var borrowType = req.body.borrowType;
  var borrowPerson = req.body.borrowPerson;
  var borrowDate = req.body.borrowDate;

  //由于审核日期要审核通过才写入，默认写入无效的日期
  var passDatetime = new Date();
  passDatetime.setFullYear(2050);

  //2. 模型实例赋值
  var borrowsInstance = new borrowsModel({
    borrowMoney: borrowMoney,
    borrowRate: borrowRate,
    borrowTerm: borrowTerm,
    repayment: repayment,
    minMoney: minMoney,
    maxMoney: maxMoney,
    borrowBonus: borrowBonus,
    borrowDays: borrowDays,
    borrowTitle: borrowTitle,
    borrowDetails: borrowDetails,
    borrowType: borrowType,
    borrowPerson: borrowPerson,
    borrowDate: borrowDate,
    isPass: false,
    passDatetime: passDatetime.toLocaleString(),
    investMoney: 0,
    isComplated: false
  });

  //3. 调用save方法进行保存
  borrowsInstance.save(function (err) {
    //4. 根据是否写入成功返回结果到前端
    if (err) {
      console.log(err.message); //服务器端打印到控制台
      res.json({
        "isSuccess": false,
        "message": "借款申请提交失败！原因：" + err.message
      });
    } else {
      res.json({
        "isSuccess": true,
        "message": "借款申请提交成功！"
      });
    }
  });
});
router.get('/investListAll',(req,res)=>{
  borrowsModel.find({},(err,data)=>{
    if(!err){
      // console.log(data);
      let newData = data.slice(-4);
      // console.log(newData);
      res.json(newData);
    }else{
      throw err;
      res.send(message.err);
    }
  });
});
// 显示投资列表
router.get('/investList',(req,res)=>{
  borrowsModel.find({},(err,investData)=>{
    if(!err){
      // console.log(investData)
      var listJson = {
        "total": investData.length,//总记录
        "list": []
      }
      var pageIndex = req.query.pageIndex;
      var pageSize = parseInt(req.query.pageSize);
      var start = pageIndex * pageSize;
      borrowsModel.find({},(err,pageData)=>{
        listJson.list=pageData;
        res.json(listJson);
      }).skip(start).limit(pageSize);
      // res.json(investData);
    }else{
      throw err;
      res.send(message.err);
    }
  })
});
//报表
router.get('/getInvestType',(req,res)=>{
  borrowsModel.find({},(err,data)=>{
    if(!err){
      // console.log(data);
      var m1=m2=m3=0;
      for(var x of data){
        // console.log(x);
        // console.log(typeof x.borrowType);
        if(x.borrowType === '1'){
          m1+=x.borrowMoney;
        }else if(x.borrowType === '2'){
          m2+=x.borrowMoney;
        }else{
          m3+=x.borrowMoney;
        }
      }
      var investData = [{
          value: m1,
          name: "信用贷"
        },
        {
          value: m2,
          name: "车易贷"
        },
        {
          value: m3,
          name: "房易贷"
        }
      ];
      res.json(investData);
    }else{
      throw err;
      res.send(message.err);
    }
  });
});
module.exports = router;
