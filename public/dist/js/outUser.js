$(function(){
    $('#outUser').on('click', () => {
        // alert(1)
        $.get('/users/outUser', (isCookie) => {
            if (isCookie) {
                let num = 5;
                let htmlStr = '<span class="glyphicon glyphicon-ok"></span>您已退出登录! ' + '<span id="outNum">' + num + '秒</span>后跳转到登录';
                // 因为计数器关系 先调用一次
                $('#isJoin .modal-body').html(htmlStr);
                //< span class = "glyphicon glyphicon-ok" > < /span>注册成功 
                //定数器每秒-1
                let timesId = setInterval(() => {
                    let htmlStr = '<span class="glyphicon glyphicon-ok"></span>您已退出登录! ' + '<span id="outNum">' + num + '秒</span>后跳转到登录';
                    $('#isJoin .modal-body').html(htmlStr);
                    num--;
                    if (num === 0) {
                        //清除定时器
                        clearInterval(timesId);
                        location.href = '/login.html';
                    }
                }, 1000);
                //显示模态框
                $('#isJoin').modal('show');
            }
        })
    });
});