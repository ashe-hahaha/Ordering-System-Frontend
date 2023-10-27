/*
 * @Description: 
 * @Author: Friends233
 */
import api from './api'

/** 测试 */
export function getUserAll() {
  return api.get('/user/all')
}

/** 登录 */
export function userLogin(params = {}){
  return api.post('/user/login',params)
}

// /** 注册 */
// export function userRegister(params = {}) {
//   return api.get('/customers/signup',params)
// }
/** 注册 */
export function userRegister(userName={}, password={}, avatar={}) {
  return api.get('/customers/signup',userName+'/'+password+'/'+avatar)
}

/** 修改用户信息 */
export function userEdit(id = '',params = {}) {
  return api.post(`/user/edit/${id}`,params)
}

/** 根据token拿到userInfo */
export function refreshUser(params = {}) {
  return api.post('/user/refresh',params)
}