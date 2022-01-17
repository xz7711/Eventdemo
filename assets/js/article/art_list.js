$(function () {
  let layer = layui.layer
  var q = {
    pagenum: 1,
    pagesize: 3,
    cate_id: '',
    state: ''
  }
  initTable()
  // 获取文章列表数据
  function initTable() {
    $.ajax({
      mathod: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取列表失败')
        }
        res.data = [
          {id:1,title:'title',pub_date:'2021-1-16 20:9:3.817',cate_name:'美食',state:'草稿'},
          {id:2,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:8:8.817',state:'草稿'},
          {id:3,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:4:3.817',state:'草稿'},
          {id:4,title:'title',cate_name:'美食',pub_date:'2021-1-16 20:8:3.817',state:'草稿'}
      ]
        let strhtml = template('tpl-table', res)
        $('tbody').html(strhtml)
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
})
