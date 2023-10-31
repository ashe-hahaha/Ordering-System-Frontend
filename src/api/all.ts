/*
 * @Description: 通用接口
 * @Author: Friends233
 */
import api from './api'

/** 获得类别列表 */
export function getSortAll() {
  return api.get9002(`/api/restaurants`)
}

/** 食品详情 */
export function getFood(id = '') {
  return api.get9002(`/api/restaurant/${id}/menu`)
}

/** 搜索 */
export function getFoodByName(str = '') {
  return api.get9002(`/api/search/${str}`)
}

/** 订单 */
export function getOrder(userId = '') {
  return api.get9001(`/api/alltypeorders/${userId}`)
}

/** 订单 */
export function addFoodLabel(params = {}) {
  return api.post(`/food/addLabel`, params)
}

