/* eslint-disable @typescript-eslint/no-explicit-any */
// index.ts
import { notification } from 'antd'
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { ResultEnum } from '../enums/httpEnum'
import { AxiosCanceler } from './helper/axiosCancel'
import { checkStatus } from './helper/checkStatus'

const axiosCanceler = new AxiosCanceler()

type Result<T> = {
  code: number
  message: string
  result: T
}

/** 导出Request，可以用来自定义传递配置来创建实例 */
export class Request {
  // axios 实例
  instance: AxiosInstance
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = {
    /** 默认地址请求地址，可在 .env 开头文件中修改 */
    baseURL: '/api',
    /** 设置超时时间（10s） */
    timeout: 60000,
    /** 跨域时候允许携带凭证 */
    withCredentials: true,
  }

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
     */
    this.instance.interceptors.request.use(this.requestBefore, this.requestReject)

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.instance.interceptors.response.use(this.requestResolove, this.requestReject)
  }

  /** 请求前处理 - 处理 config */
  requestBefore(config: any) {
    // * 将当前请求添加到 pending 中
    axiosCanceler.addPending(config)
    /** 一般会请求拦截里面加token，用于后端的验证 */
    const token = localStorage.getItem('token') as string
    if (token) {
      config.headers.Authorization = token
    }

    return config
  }

  /** 请求成功 - 响应处理 */
  requestResolove(response: AxiosResponse) {
    const { data, config } = response
    // * 在请求结束后，移除本次请求(关闭loading)
    axiosCanceler.removePending(config)
    // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
    if (data.code && data.code !== ResultEnum.SUCCESS) {
      notification.open({
        message: data.message,
        key: 'error',
        type: 'error',
        description: '请检查网络或联系管理员！',
      })
      return Promise.reject(data)
    }
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    return Promise.resolve(data)
  }

  /** 请求错误 - 响应处理 */
  requestReject(error: AxiosError) {
    const { response } = error
    // 请求超时单独判断，请求超时没有 response
    if (error.message.indexOf('timeout') !== -1) {
      // 比如element plus 可以使用 ElMessage
      notification.open({
        message: '请求超时，请稍后再试',
        key: 'error',
        type: 'error',
        description: '请检查网络或联系管理员！',
      })
      // 根据响应的错误状态码，做不同的处理
      if (response) checkStatus(response.status)
      // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
      if (!window.navigator.onLine) window.location.hash = '/500'
      // 这里是AxiosError类型，所以一般我们只reject我们需要的响应即可
      return Promise.reject(error)
    }
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
