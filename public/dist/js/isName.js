$(function(){
    $('#username').on('blur', () => {
        // alert(1);
        var username = $('#username').val();
        // console.log(username.length);
        if (username.length > 5) {
            $.post('/users/isName', 'username=' + username, (data) => {
                // console.log(data);
                if (data.isSuccess === false) {
                    let htmlStr = '<span class="glyphicon glyphicon-remove"></span>对不起，用户名已存在!';
                    $('#isJoin .modal-body').html(htmlStr);
                    //显示模态框
                    $('#isJoin').modal('show');
                } else {
                    let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜，用户名可以注册!';
                    $('#isJoin .modal-body').html(htmlStr);
                    //显示模态框
                    $('#isJoin').modal('show');
                }
            })
        }
    });
});