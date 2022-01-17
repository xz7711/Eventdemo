$(function () {
  let form = layui.form
  let layer = layui.layer
  var laypage = layui.laypage
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }
  initTable()
  initCate()
  // 获取文章列表数据
  function initTable() {
    $.ajax({
      mathod: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取列表失败')
        }
        // res.data = [
        //   { id: 1, title: 'title', pub_date: '2021-1-16 20:9:3.817', cate_name: '美食', state: '草稿' },
        //   { id: 2, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:8:8.817', state: '草稿' },
        //   { id: 3, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:4:3.817', state: '草稿' },
        //   { id: 4, title: 'title', cate_name: '美食', pub_date: '2021-1-16 20:8:3.817', state: '草稿' }
        // ]
        let strhtml = template('tpl-table', res)
        $('tbody').html(strhtml)
        renderPage(res.total)
      }

    })
  }

  // 初始化文章分类
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取文章信息失败')
        }
        let htmlstr = template('tpl-cate', res)
        // console.log(htmlstr);
        $('[name=cate_Id]').html(htmlstr)
        // 通知layui 重新渲染layui结构
        form.render()
      }
    })
  }
  // 过滤器
  template.defaults.imports.dateFormat = function (date) {
    let dt = new Date(date)
    let y = dt.getFullYear()
    let m = String((dt.getMonth() + 1)).padStart(2, '0')
    let d = String(dt.getDate()).padStart(2, '0')
    let hh = String(dt.getHours()).padStart(2, '0')
    let mm = String(dt.getMinutes()).padStart(2, '0')
    let ss = String(dt.getSeconds()).padStart(2, '0')
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

  // 监听筛选按钮表单提交事件
  $('#form-serch').on('submit', function(e) {
    e.preventDefault()
    let cate_id = $('[name=cate_Id]').val()
    let state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    initTable()
  })

  //渲染分页
  function renderPage(total){
    laypage.render({
      elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
      ,count:total,  //数据总数，从服务端得到
      limit:q. pagesize,
      curr:q. pagenum,
      jump: function(obj, first){
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagenum=obj.curr
        //首次不执行
        if(!first){
          initTable()
        }
        
      }
    });
  }
})
