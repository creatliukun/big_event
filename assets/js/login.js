$(function () {
    $("#link_reg").on("click", function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $("#link_login").on("click", function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // const form = layui.form;
    //解构
    const { form, layer } = layui;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合规则'],
        repwd: function (value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });

    // 监听注册表单的提交事件
    // $('#form_reg').on('submit', function (e) {
    //     // 1. 阻止默认的提交行为
    //     e.preventDefault()
    //     console.log(1);
    //     // 2. 发起Ajax的POST请求
    //     var data = {
    //         username: $('#form_reg [name=username]').val(),
    //         password: $('#form_reg [name=password]').val()
    //     }
    //     $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
    //         if (res.status !== 0) {
    //             return layer.msg(res.message)
    //         }
    //         layer.msg('注册成功，请登录！')
    //         // 模拟人的点击行为
    //         $('#link_login').click()
    //     })
    // })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        console.log(1);
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            // data: {
            //     username: $('#form_reg [name=username]').val(),
            //     password: $('#form_reg [name=password]').val(),
            // },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('res.message||注册失败');
                    return;
                }
                layer.msg('res.message||注册成功，请登录！');
                //模拟注册成功后的点击，跳转到登陆页面
                $('#link_login').click()
            }
            // success: (res) => {
            //     if (res.status !== 0) {
            //         console.log('res.message||注册失败');
            //         return;
            //     }
            //     console.log('res.message||注册成功');
            // }
        })


    })

    //     // 监听登录表单的提交事件
    // $('#form_login').submit(function(e) {
    //     // 阻止默认提交行为
    //     e.preventDefault()
    //     $.ajax({
    //       url: 'http://ajax.frontend.itheima.net/api/login',
    //       method: 'POST',
    //       // 快速获取表单中的数据
    //       data: $(this).serialize(),
    //       success: function(res) {
    //         if (res.status !== 0) {
    //           return layer.msg('登录失败！')
    //         }
    //         layer.msg('登录成功！')
    //         // 将登录成功得到的 token 字符串，保存到 localStorage 中
    //         localStorage.setItem('token', res.token)
    //         // 跳转到后台主页
    //         location.href = '/index.html'
    //       }
    //     })


 // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                localStorage.setItem("token", res.token);
                location.href = '/index.html';
            }
        })
    })
})

