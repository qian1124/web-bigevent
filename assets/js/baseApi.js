// 注意：每次调用$GET POST AJAX 的时候会先调用ajaxPrefilter这个函数
// 在这个函数中 可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url)
        // 在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})