$(function(){
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nikename: function(value){ 
      if (value.length > 6) {
        return '昵称长度必须在1~6个字符之间'
      }
    }
  })
  initUserInfo()
  function initUserInfo() {
    $.ajax({
      method:'get',
      url:'/my/userinfo',
      success: function(res){
        // console.log(res);
        if(res.status !== 0) {
          return layer.msg('获取用户信息失败')
        }
        form.val('layui-user-info',res.data)
      }
    })
  }
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
  })
})