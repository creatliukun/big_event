$(function () {
    getUserInfo();

    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', {
            icon: 3, title: '提示'
        },
            function (index) {
                localStorage.removeItem('token');
                location.href = '/login.html';
                layer.close(index)
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                layui.layer.msg(res.message);

                return
            }
            console.log(res);
            //调用 renderAvatar渲染用户的头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    console.log(user);
    const name = user.nickname || user.username;
    console.log(name);
    $('#welcome').html(`欢迎${name}`);
    if (user.user_pic) {
        $(".layui-nav-img").attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        const first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        $(".layui-nav-img").hide();

    }
}