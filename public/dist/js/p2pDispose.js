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
});