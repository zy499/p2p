$(function(){
    $.get('/users/checkUser',(isCookie)=>{
        if(!isCookie){
            location.href = 'login.html';
        }
    })
})