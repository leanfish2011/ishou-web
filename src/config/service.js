// 整个项目的调用API

//当前网页IP
const ROOT_PATH = `${window.location.origin.replace(/:\d+/, '')}`;

//各个接口地址
const url = {
  home: ROOT_PATH + ':9092/api/v1/site/index',
  login: ROOT_PATH + ':9091/api/v1/auth/access/login',
  register: ROOT_PATH + ':9091/api/v1/auth/access/register',
  sitePersonal: ROOT_PATH + ':9092/api/v1/site/personal',
  siteHome: ROOT_PATH + ':9092/api/v1/site/home',
  logout: ROOT_PATH + ':9091/api/v1/auth/access/logout',
  user: ROOT_PATH + ':9091/api/v1/auth/user',
  role: ROOT_PATH + ':9091/api/v1/auth/role',
  authCheck: ROOT_PATH + ':9091/api/v1/auth/access/check',
  menuAll: ROOT_PATH + ':9091/api/v1/auth/menu',
  menuRole: ROOT_PATH + ':9091/api/v1/auth/role/menu',
  roleUser: ROOT_PATH + ':9091/api/v1/auth/role/user',
  menuUser: ROOT_PATH + ':9091/api/v1/auth/menu/user',
  changePwd: ROOT_PATH + ':9091/api/v1/auth/access/password',
};

export default {
  url
};
