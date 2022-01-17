$(function () {
  let layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnfile').on('click', function () {
    $('#file').click()
  })
  $('#file').on('change', function (e) {
    console.log(e);
    let files = e.target.files
    if (files.length === 0) {
      return layer.msg('请选择图片上传')
    }
    let imgUrl = URL.createObjectURL(files[0])
    // cropper('destroy') 内容销毁
    $image.cropper('destroy').attr('src', imgUrl).cropper(options)
  })
  $('#btnUpload').on('click', function () {
    let dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data : {
        avatar: dataURL,
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('更换头像失败')
        }
        layer.msg('更换头像成功')
        window.parent.getUserInfo()
      }
    })
  })
})
