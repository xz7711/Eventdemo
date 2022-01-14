$(function () {
  getUserInfo()
  let layer =layui.layer
  $('#logout').on('click',function(){
    layer.confirm('确认退出？', {icon: 3, title:'提示'}, function(index){
      localStorage.removeItem('token')
      location.href='/login.html'
      layer.close(index);
    });
  })
})
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message, { icon: 6 });
      }
      renderAvatar(res.data)
    }
  })
}
function renderAvatar(data) {
  let name = data.nickname || data.username
  $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
  if (data.user_pic !== null) {
    $('.layui-nav-img').attr('src', data.user_pic).show()
    $('.text_avatar').hide()
  } else {
    let first = name[0].toUpperCase()
    $('.text_avatar').html(first).show()
    $('.layui-nav-img').hide()
  }
}  
