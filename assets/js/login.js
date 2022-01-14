$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  // 从layui中拿到 form对象
  let form = layui.form
  // 通过form.verify 自定义校验规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repwd: function (value) {
      let res = $('.reg-box [name=password]').val()
      if (res !== value) {
        return '两次密码输入不一致'
      }
    }
  })
  // 监听注册表单的提交事件 
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message, { icon: 6 });
      }
      console.log(res);
      layer.msg('注册成功请登录', { icon: 6 });
      $('#link_login').click()
    })
  })

 
  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      method : 'POST',
      url:'/api/login',
      data : $(this).serialize(),
      success:function(res) {
        console.log(res);
        if(res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登陆成功')
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
      }
    })
  })
})