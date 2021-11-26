$(function() {
    // 点击去注册账号的链接
    $('#link-reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        // 点击去登录的链接
    $('#link-login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //    从layUI中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()自定义检验规则
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            repwd: function(value) {
                // 校验两次密码是否一致的规则
                var pwd = $('.reg-box [name=password]').val()
                    // 通过形参拿到的是确认密码框中的内容
                    // 还需要拿到密码框中的内容
                    // 然后进行一次等于的判断
                    // 如果判断失败,则return一个提示消息即可
                if (pwd !== value) {
                    return "两次密码不一致"
                }
            }

        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            // 1 阻止默认提交的行为
            e.preventDefault()
                // 2 发起Ajax的post请求
            var data = { username: $('#form_reg [name="username" ]').val(), password: $('#form_reg [name="password"]').val() }
            $.post('http://api-breakingnews-web.itheima.net/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                    // 模拟人的点击行为
                $('#link-login').click()
            })
        })
        //     //  监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
            //  发起Ajax请求
        $.ajax({
            method: 'post',
            url: 'http://api-breakingnews-web.itheima.net/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    // 登录接口有问题  注释return并跳过
                    // return layer.msg('登录失败')


                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }


        })

    })


})