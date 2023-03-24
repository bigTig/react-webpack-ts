/* eslint-disable @typescript-eslint/no-explicit-any */
// index.ts
import { notification } from 'antd'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

type Result<T> = {
  code: number
  message: string
  result: T
}

// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 60000 }

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(this.requestBefore, this.requestReject)

    this.instance.interceptors.response.use(this.requestResolove, this.requestReject)
  }

  /** 请求前处理 - 处理 config */
  requestBefore(config: any) {
    // 一般会请求拦截里面加token，用于后端的验证
    const token = localStorage.getItem('token') as string
    if (token) {
      config.headers.Authorization = token
    }

    return config
  }

  /** 请求成功 - 响应处理 */
  requestResolove(res: AxiosResponse) {
    console.log(res)
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    return Promise.resolve(res)
  }

  /** 请求错误 - 响应处理 */
  requestReject(err: {
    response: {
      statusText: string
      data: any
      status: any
    }
  }) {
    // 这里用来处理http常见错误，进行全局提示
    let message = ''
    switch (err.response.status) {
      case 400:
        message = '请求错误(400)'
        break
      case 401:
        message = '未授权，请重新登录(401)'
        // 这里可以做清空storage并跳转到登录页的操作
        break
      case 403:
        message = '拒绝访问(403)'
        break
      case 404:
        message = '请求出错(404)'
        break
      case 408:
        message = '请求超时(408)'
        break
      case 500:
        message = '服务器错误(500)'
        break
      case 501:
        message = '服务未实现(501)'
        break
      case 502:
        message = '网络错误(502)'
        break
      case 503:
        message = '服务不可用(503)'
        break
      case 504:
        message = '网络超时(504)'
        break
      case 505:
        message = 'HTTP版本不受支持(505)'
        break
      default:
        message = `连接出错(${err.response.status})!`
    }
    // 这里错误消息可以使用全局弹框展示出来
    // 比如element plus 可以使用 ElMessage
    notification.open({
      message: message,
      key: 'error',
      type: 'error',
      description: '请检查网络或联系管理员！',
    })
    // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
    return Promise.reject(err?.response.statusText)
  }

  /** 定义请求方法 */
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  /** Get 请求 */
  public get<R = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Result<R>>> {
    return this.instance.get(url, config)
  }

  /** Post 请求 */
  public post<P = any, R = any>(
    url: string,
    data?: P,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<R>>> {
    return this.instance.post(url, data, config)
  }

  /** Put 请求 */
  public put<P = any, R = any>(
    url: string,
    data?: P,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<R>>> {
    return this.instance.put(url, data, config)
  }

  /** delete 请求 */
  public delete<R = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<Result<R>>> {
    return this.instance.delete(url, config)
  }
}

// 默认导出Request实例
export default new Request({})
