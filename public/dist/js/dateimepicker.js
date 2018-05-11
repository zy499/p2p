$(function(){
    //bootstrap时间控件
    $('#date1').datetimepicker({
        format: 'YYYY-MM-DD hh:mm:ss',
        locale: moment.locale('zh-cn')
    });
});