$(function(){
    $.get('/borrow/investListAll', function (data) {
        
        var investJson = {
            list:data
        }
        console.log(investJson);
        // console.log(investJson);
        var htmlStr = template('investTmpl',investJson);
        // console.log(htmlStr);
        $('#investdBody').html(htmlStr);
    })
});