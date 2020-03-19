// 整个项目的调用API

//当前网页IP
const ROOT_PATH = `${window.location.origin.replace(/:\d+/, '')}`;

//各个接口地址
const url = {
  home: ROOT_PATH + ':9092/api/v1/site/index',
  login: ROOT_PATH + ':9092/api/v1/auth/login',
  register: ROOT_PATH + ':9092/api/v1/auth/register'
}

export default {
  url
};
