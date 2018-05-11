//公共交互脚本
$(function () {
    //工具显示微信图标
    $('#weixinTips').tooltip();
    //个人中心正文导航条收齐与展开
    $('#toggleBtn').on('click',function(){
        // alert(1)
        $('#memberMain').toggleClass('active');
        let isActive = $('#memberMain').hasClass('active');
        if(isActive){
            $(this).text('展开');
        }else{
            $(this).text('收起');
        }
    });
    /* 
        手机触屏事件
    */
   let touchstartX = touchendX = 0;
   $(document).on('touchstart',function(e){
       //得到水平方向开始位置
       touchstartX = e.changedTouches[0].clientX;
    //    console.log(touchstartX)
   });
   $(window).on('touchend', function (e) {
       //得到水平方向结束位置
       let touchendX = e.changedTouches[0].clientX;
       //得到水平方向移动的距离
       let touchMove = Math.abs(touchstartX - touchendX);
       if (touchMove >= 80) {
           //trigger模拟点击事件。
           $('#toggleBtn').trigger('click');
       }
   });
   
   //borrow提交表单请求
   $('#borrowBtn').on('click', function () {
       //接收表单的值
       let borrowData = $('#borrowForm').serialize();
       $.ajax({
           type:'post',
           url:'/borrow/add',
           data:borrowData,
           success:function(data){
            //    console.log(data);
            if(data.isSuccess){
                let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜，申请已提交!';
                $('#isJoin2 .modal-body').html(htmlStr);
                //显示模态框
                $('#isJoin2').modal('show');
                $(':input', '#borrowForm')
                // 将myform表单中input元素type为button、submit、reset、hidden排除
                .not(':button,:submit,:reset,:hidden,#borrowPerson') 
                // 将input元素的value设为空值
                .val('') 
                .removeAttr('checked')
                // 如果任何radio/checkbox/select inputs有checked or selected 属性，将其移除
                .removeAttr('selected');
            }else{
                let htmlStr = '<span class="glyphicon glyphicon-ok"></span>对不起，申请失败!';
                $('#isJoin2 .modal-body').html(htmlStr);
                //显示模态框
                $('#isJoin2').modal('show');
            }
          
           }
       })
   });
});