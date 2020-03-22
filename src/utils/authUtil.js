var authUtil = {
  clearSession: function () {
    sessionStorage.removeItem('userCode');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
  }
};

export default authUtil
