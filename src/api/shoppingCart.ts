/*
 * @Description: 
 * @Author: Friends233
 */
import api from './api'

/** 购物车 */
export function getSptAll() {
  return api.get9001('/shoppingcart/all')
}

/** 获取购物车 */
export function getSpt(id = '') {
  return api.get9001(`/shoppingcart/${id}`)
}

/** 添加 */
export function addFood(params = {}) {
  return api.post9001(`/api/orders`, params)
}

/** 清空 */
export function clearAll(id = '') {
  return api.post9001(`/shoppingcart/clear/${id}`,)
}

/** 移除 */
export function removeFood(params = {}) {
  return api.post9001(`/shoppingcart/remove`, params)
}

/** 结算 */
export function submitCart(params = {}) {
  return api.post9001(`/shoppingcart/submit`, params)
}

