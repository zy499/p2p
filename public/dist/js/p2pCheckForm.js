$(function () {
    //配置表单验证插件的参数
    //给哪个表单做验证
    $('#joinFrom').bootstrapValidator({
        message: 'This value is not valid', //全局的表单提示信息
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //验证成功的图标
            invalid: 'glyphicon glyphicon-remove', //验证失败的图标
            validating: 'glyphicon glyphicon-refresh' //ajax验证的等待图标
        },
        //给哪些表单元素做验证
        fields: {
            //用户做验证，使用的是name属性
            username: {
                message: '用户名验证未通过', //局部的提示信息： 优先
                //验证规则
                validators: {
                    //非空验证
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度在6~18位之间'
                    },
                    //正则表达式验证
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能是大小写字母、数字、下划线'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度在6~18位之间'
                    }
                }
            },
            password2: {
                validators: {
                    notEmpty: {
                        message: '确认密码不能为空'
                    },
                    //如何判断两次密码是否一致?
                    identical: {
                        field: 'password', //与那个字段进行比较
                        message: '两次输入的密码不一致'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: '电子邮件不能为空'
                    },
                    emailAddress: {
                        message: '电子邮箱格式不正确，正确格式：abc@126.com'
                    }
                }
            },
            //多选框验证
            'join[]': {
                validators: {
                    notEmpty: {
                        message: '请同意用户注册协议!'
                    }
                }
            }
        }
    })
    //表单前端验证成功后发起AJAX请求到后台
    .on('success.form.bv', function (e) {
        // 因为是发起AJAX请求，所以阻止默认提交表单
        e.preventDefault();
        // 获取表单示例
        var $form = $(e.target);
        // 获取验证插件的示例
        var bv = $form.data('bootstrapValidator');

        // 发起AJAX请求提交数据到后台
        /*
        $.post(url,data,successCB,dataType)
        url	必需。规定把请求发送到哪个 URL。
        data	可选。映射或字符串值。规定连同请求发送到服务器的数据。
        successCB(data, textStatus, jqXHR)	可选。请求成功时执行的回调函数。
        dataType	
        可选。规定预期的服务器响应的数据类型。（xml、json、script 或 html）。
        */
        //$form.serialize(); //批量接收表单的值并完成拼接

        //因为有密码，从安全角度考虑使用post请求
        $.post("/users/join", $form.serialize(), function (data) {
            // console.log("接收到的数据", data);
            if (data.isSuccess){
                let num = 5;
                let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜,注册成功! '+'<span id="outNum">'+num+'秒</span>后跳转到登录';
                // 因为计数器关系 先调用一次
                $('#isJoin .modal-body').html(htmlStr);
                //< span class = "glyphicon glyphicon-ok" > < /span>注册成功 
                //定数器每秒-1
                let timesId = setInterval(()=>{
                    let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜,注册成功! ' + '<span id="outNum">' + num + '秒</span>后跳转到登录';
                    $('#isJoin .modal-body').html(htmlStr);
                    num--;
                    if(num === 0){
                        //清除定时器
                        clearInterval(timesId);
                        location.href='/login.html';
                    }
                },1000);
            }else{
                let htmlStr ='<span class="glyphicon glyphicon-remove"></span>对不起，注册失败!';
                $('#isJoin .modal-body').html(htmlStr);
            }
            //显示模态框
            $('#isJoin').modal('show');
        }, 'json');
    });
    // 用户登录验证
    $('#loginFrom').bootstrapValidator({
        message: 'This value is not valid', //全局的表单提示信息
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', //验证成功的图标
            invalid: 'glyphicon glyphicon-remove', //验证失败的图标
            validating: 'glyphicon glyphicon-refresh' //ajax验证的等待图标
        },
        //给哪些表单元素做验证
        fields: {
            //用户做验证，使用的是name属性
            username: {
                message: '用户名验证未通过', //局部的提示信息： 优先
                //验证规则
                validators: {
                    //非空验证
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '用户名长度在6~18位之间'
                    },
                    //正则表达式验证
                    regexp: {
                        regexp: /^[a-zA-Z0-9_]+$/,
                        message: '用户名只能是大小写字母、数字、下划线'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //字符串长度验证
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码长度在6~18位之间'
                    }
                }
            }
        }
    })
    //表单前端验证成功后发起AJAX请求到后台
    .on('success.form.bv', function (e) {
        // 因为是发起AJAX请求，所以阻止默认提交表单
        e.preventDefault();
        // 获取表单示例
        var $form = $(e.target);
        // 获取验证插件的示例
        var bv = $form.data('bootstrapValidator');

        // 发起AJAX请求提交数据到后台
        /*
        $.post(url,data,successCB,dataType)
        url	必需。规定把请求发送到哪个 URL。
        data	可选。映射或字符串值。规定连同请求发送到服务器的数据。
        successCB(data, textStatus, jqXHR)	可选。请求成功时执行的回调函数。
        dataType	
        可选。规定预期的服务器响应的数据类型。（xml、json、script 或 html）。
        */
        //$form.serialize(); //批量接收表单的值并完成拼接

        //因为有密码，从安全角度考虑使用post请求
        $.post("/users/login", $form.serialize(), function (data) {
            // console.log("接收到的数据", data);
            if (data.isSuccess) {
                let num = 5;
                let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜,登录成功! ' + '<span id="outNum">' + num + '秒</span>后跳转到个人中心';
                // 因为计数器关系 先调用一次
                $('#isJoin .modal-body').html(htmlStr);
                //< span class = "glyphicon glyphicon-ok" > < /span>注册成功 
                //定数器每秒-1
                let timesId = setInterval(() => {
                    let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜,登录成功! ' + '<span id="outNum">' + num + '秒</span>后跳转到个人中心';
                    $('#isJoin .modal-body').html(htmlStr);
                    num--;
                    if (num === 0) {
                        //清除定时器
                        clearInterval(timesId);
                        location.href = '/personal.html';
                    }
                }, 1000);
            } else {
                let htmlStr = '<span class="glyphicon glyphicon-remove"></span>用户名或密码有误!';
                $('#isJoin .modal-body').html(htmlStr);
            }
            //显示模态框
            $('#isJoin').modal('show');
        }, 'json');
    });
    // //用户申请借款验证
    // $('#borrowForm').bootstrapValidator({
    //     message: 'This value is not valid', //全局的表单提示信息
    //     feedbackIcons: {
    //         valid: 'glyphicon glyphicon-ok', //验证成功的图标
    //         invalid: 'glyphicon glyphicon-remove', //验证失败的图标
    //         validating: 'glyphicon glyphicon-refresh' //ajax验证的等待图标
    //     },
    //     //给哪些表单元素做验证
    //     fields: {
    //         borrowType: {
    //             message: '验证未通过', //局部的提示信息： 优先
    //             //验证规则
    //             validators: {
    //                 //非空验证
    //                 notEmpty: {
    //                     message: '借款类型不能为空'
    //                 }
    //             }
    //         },
    //         borrowDate: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '借款日期不能为空'
    //                 }
    //             }
    //         },
    //         borrowMoney: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '借款金额不能为空'
    //                 },
    //                 //正则表达式验证
    //                 regexp: {
    //                     regexp: /^[0-9]+$/,
    //                     message: '只能是数字'
    //                 }
    //             }
    //         },
    //         borrowRate: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '借款利息不能为空'
    //                 },
    //                 //正则表达式验证
    //                 regexp: {
    //                     regexp: /^[0-9.]+$/,
    //                     message: '只能是数字'
    //                 }
    //             }
    //         },
    //         borrowTerm: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '借款期限不能为空'
    //                 }
    //             }
    //         },
    //         repayment: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '还款方式不能为空'
    //                 }
    //             }
    //         },
    //         minMoney: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '最小投标不能为空'
    //                 },
    //                 //正则表达式验证
    //                 regexp: {
    //                     regexp: /^[0-9.]+$/,
    //                     message: '只能是数字'
    //                 }
    //             }
    //         },
    //         maxMoney: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '最大投标不能为空'
    //                 },
    //                 //正则表达式验证
    //                 regexp: {
    //                     regexp: /^[0-9.]+$/,
    //                     message: '只能是数字'
    //                 }
    //             }
    //         },
    //         borrowBonus: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '投标奖金不能为空'
    //                 }
    //             }
    //         },
    //         borrowDays: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '招标天数不能为空'
    //                 }
    //             }
    //         },
    //         borrowTitle: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '借款标题不能为空'
    //                 }
    //             }
    //         },
    //         borrowDetails: {
    //             validators: {
    //                 notEmpty: {
    //                     message: '借款描述不能为空'
    //                 }
    //             }
    //         },

    //     }
    // })
    // .on('success.form.bv', function (e) {
    //     // 因为是发起AJAX请求，所以阻止默认提交表单
    //     e.preventDefault();
    //     // 获取表单示例
    //     var $form = $(e.target);
    //     // 获取验证插件的示例
    //     var bv = $form.data('bootstrapValidator');

    //     // 发起AJAX请求提交数据到后台
    //     /*
    //     $.post(url,data,successCB,dataType)
    //     url	必需。规定把请求发送到哪个 URL。
    //     data	可选。映射或字符串值。规定连同请求发送到服务器的数据。
    //     successCB(data, textStatus, jqXHR)	可选。请求成功时执行的回调函数。
    //     dataType	
    //     可选。规定预期的服务器响应的数据类型。（xml、json、script 或 html）。
    //     */
    //     //$form.serialize(); //批量接收表单的值并完成拼接

    //     //因为有密码，从安全角度考虑使用post请求
    //     $.post("/borrow/add", $form.serialize(), function (data) {
    //         // console.log("接收到的数据", data);
    //         if(data.isSuccess){
    //             let htmlStr = '<span class="glyphicon glyphicon-ok"></span>恭喜，申请已提交!';
    //             $('#isJoin2 .modal-body').html(htmlStr);
    //             //显示模态框
    //             $('#isJoin2').modal('show');
    //         }else{
    //             let htmlStr = '<span class="glyphicon glyphicon-ok"></span>对不起，申请失败!';
    //             $('#isJoin2 .modal-body').html(htmlStr);
    //             //显示模态框
    //             $('#isJoin2').modal('show');
    //         }
    //         $(':input', '#borrowForm')
    //             .not(':button,:submit,:reset,:hidden,#borrowPerson') //将myform表单中input元素type为button、submit、reset、hidden排除
    //             .val('') //将input元素的value设为空值
    //             .removeAttr('checked')
    //             .removeAttr('selected');// 如果任何radio/checkbox/select inputs有checked or selected 属性，将其移除
    //     }, 'json');
    // });
});