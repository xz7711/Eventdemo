$(function(){
  let layer = layui.layer
  let form = layui.form
  initArtCateList ()
  let indexAdd = null
  $('#btnAddCate').on('click',function(){
    indexAdd =  layer.open({
      type: 1, 
      title: '添加文章分类',
      area: ['500px', '249px'],
      content: $('#dialog-add').html()
    });     
  })
  
  $('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/article/addcates',
      data:$(this).serialize(),
      success:function(res){
        console.log(res);
        if(res.status !== 0){
          return layer.msg('添加文章分类失败')
        }
        initArtCateList()
        layer.msg('添加文章分类成功')
        layer.close(indexAdd)
      }
    })
  })

  // 给编辑按钮事件委托
  let indexEdit = null
  $('body').on('click','#btnEdit',function(){
    indexEdit =  layer.open({
      type: 1, 
      title: '修改分类',
      area: ['500px', '249px'],
      content: $('#dialog-edit').html()
    });  
    // 获取表单对应数据
    let id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url:'/my/article/cates/'+id,
      success:function(res){
        // console.log(res);
       form.val('form-edit',res.data)
      }
    })
  })




  // 动态创建的所以用事件委托
  // #form-Eait 表单提交
  $('body').on('submit','#form-Edit',function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/my/article/updatecate',
      data:$(this).serialize(),
      success:function(res){
        console.log(res);
        if(res.status !== 0){
          return layer.msg('修改文章分类失败')
        }
        layer.msg('修改文章分类成功')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })

  // 删除数据
  $('body').on('click','#btnRem',function(){
    let id = $(this).attr('data-id')
    layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        method:'GET',
        url:'/my/article/deletecate/'+id,
        success:function(res){
          console.log(res);
          if(res.status!==0) {
            return layer.msg('删除失败')
          }
          layer.msg('删除成功')
          initArtCateList ()
          layer.close(index);
        }
      })
    }); 
    
  })
})

// 初始化tbody信息
function initArtCateList () {
  $.ajax({
    method:'GET',
    url:'/my/article/cates',
    success: function(res){
    let strhtml =  template('tpl-table',res)
    // console.log(res);
    $('tbody').html(strhtml)
    }
  })

}