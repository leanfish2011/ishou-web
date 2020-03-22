/**
 * auth相关处理函数
 * 1、清除登录记录
 */
var authUtil = {
  clearSession: function () {
    sessionStorage.removeItem('userCode');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
  }
};

export default authUtil
