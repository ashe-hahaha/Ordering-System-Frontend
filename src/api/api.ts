/*
 * @Description: 接口
 * @Author: Friends233
 */
import axios from 'axios'

enum httpMethods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put'
}

const request = axios.create({
  baseURL:'http://localhost:9003/',
  // baseURL: '/customers',
  timeout: 2000
});

const request9002 = axios.create({
  baseURL:'http://localhost:9002/',
  timeout: 2000
});

const request9001 = axios.create({
  baseURL:'http://localhost:9001/',
  timeout: 2000
});

// 拦截器
request.interceptors.response.use(
  res => {
    if (res.status == 200 || res.status == 201) {
      return res.data
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default {
  get(url: string, params = {}) {
    return request({
      method: httpMethods.GET,
      params: {
        ...params,
      },
      url,
    })
  },
  get9001(url: string, params = {}) {
    return request9001({
      method: httpMethods.GET,
      params: {
        ...params,
      },
      url,
    })
  },
  get9002(url: string, params = {}) {
    return request9002({
      method: httpMethods.GET,
      params: {
        ...params,
      },
      url,
    })
  },
  post(url: string, params = {}) {
    return request({
      method: httpMethods.POST,
      data: params,
      url,
    })
  },
  post9001(url: string, params = {}) {
    return request9001({
      method: httpMethods.POST,
      data: params,
      url,
    })
  },
  post9002(url: string, params = {}) {
    return request9002({
      method: httpMethods.POST,
      data: params,
      url,
    })
  },
  delete(url: string, params = {}) {
    return request({
      method: httpMethods.DELETE,
      params: {
        ...params,
        // time: new Date().getTime()
      },
      url,
    })
  },
  put(url: string, params = {}) {
    return request({
      method: httpMethods.PUT,
      data: params,
      url,
    })
  }
}