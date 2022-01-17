
// 拦截器 请求之前统一处理
// 请求之前携带数据过去 路径拼接
$.ajaxPrefilter(function(options){
// console.log(options);
options.url = 'http://www.liulongbin.top:3007'+options.url
// 给所有dai/my的请求 携带token
if(options.url.includes('/my/')){
  options.headers={
    Authorization: localStorage.getItem('token') || '',
  }
}
options.complete = function(res) {
  // console.log(res);
  if(res.responseJSON.status ===1 && res.responseJSON.message ==='身份认证失败！'){
    localStorage.removeItem('token')
    location.href='/login.html'
  }
}

})