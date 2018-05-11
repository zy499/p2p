$(function () {
    $.get('/users/disName', (data) => {
        // console.log(data)
        let username = data.usernameCookie;
        // console.log(username);
        htmlStr = '<li><a href="personal.html"><span class="glyphicon glyphicon-user"></span> ' + username + '</a></li >';
        $('.navbar-right').append(htmlStr);
        $('#_login').remove();
        $('#_join').remove();
        $('#borrowPerson').val(username);
    });
});