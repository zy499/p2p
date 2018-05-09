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
   
});