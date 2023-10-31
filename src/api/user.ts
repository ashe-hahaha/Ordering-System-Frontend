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
  return api.post('/customers/signin',params)
}

/** 注册 */
export function userRegister(params = {}) {
  return api.post('/customers/signup',params)
}

/** 修改用户信息 */
export function userEdit(params = {}) {
  return api.put(`/customers/update`,params)
}

/** 根据token拿到userInfo */
export function refreshUser(params = {}) {
  return api.post('/user/refresh',params)
}