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
  return api.get9001(`api/orders/find/${id}`)
}

/** 添加 */
export function addFood(foodId = '', userId='', quantity=1) {
  return api.get9001(`api/orders/${foodId}/${userId}/${quantity}`)
}

/** 清空 */
export function clearAll(id = '') {
  return api.get9001(`api/orders/delete/${id}`,)
}

/** 移除 */
export function removeFood(foodItemId = '', userId='') {
  return api.get9001(`/api/orders/deleteOne/${foodItemId}/${userId}`)
}

/** 结算 */
export function submitCart(params = {}) {
  return api.get9001(`/shoppingcart/submit`, params)
}

