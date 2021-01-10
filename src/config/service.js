// 整个项目的调用API

//当前网页IP
const ROOT_PATH = `${window.location.origin.replace(/:\d+/, '')}`;

// github登录信息
const githubLoginData = {
  authorize_uri: "https://github.com/login/oauth/authorize",
  client_id: "f2a52e951e10ea966cf9",
  redirect_uri: ROOT_PATH + "/github/auth"
};

const thirdLoginGate = {
  githubAuth: githubLoginData.authorize_uri + '?client_id='
    + githubLoginData.client_id
    + '&redirect_uri=' + githubLoginData.redirect_uri
};

// 后端微服务入口
const serviceGate = {
  authService: ROOT_PATH + '/api/v1/auth',
  siteService: ROOT_PATH + '/api/v1/site',
  systemService: ROOT_PATH + '/api/v1/system'
};

//各个接口地址
const url = {
  login: serviceGate.authService + '/access/login',
  register: serviceGate.authService + '/access/register',
  logout: serviceGate.authService + '/access/logout',
  user: serviceGate.authService + '/user',
  role: serviceGate.authService + '/role',
  authCheck: serviceGate.authService + '/access/check',
  menuAll: serviceGate.authService + '/menu',
  menuRole: serviceGate.authService + '/role/menu',
  roleUser: serviceGate.authService + '/role/user',
  menuUser: serviceGate.authService + '/menu/user',
  changePwd: serviceGate.authService + '/access/password',
  loginByGitHub: serviceGate.authService + '/access/login/github',
  home: serviceGate.siteService + '/index',
  search: serviceGate.siteService + '/index/search',
  sitePersonal: serviceGate.siteService + '/personal',
  siteHome: serviceGate.siteService + '/home',
  sub: serviceGate.systemService + '/site/sub',
  subExist: serviceGate.systemService + '/site/sub/exist',
  message: serviceGate.systemService + '/message',
  messageList: serviceGate.systemService + '/message/list',
  githubAuth: thirdLoginGate.githubAuth
};

export default {
  url
};
