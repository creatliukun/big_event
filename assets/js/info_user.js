$(function () {
    const { form , layer } = layui;
    form.verify({
        nickname: function (value) {
            console.log(value);
            // debugger;
            if (value.length > 6) {
                return "昵称必须小于6位";
            }
            
        }
    });

    // $('#submit').on('submit', function (e) {
    //     e.preventDefault();
    // })
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                form.val('formUserInfo',res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo()
    });
    
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.messsage);
                    return
                }
                layer.msg('跟新用户信息成功');
                window.parent.getUserInfo();
            }
        })
    })
})
