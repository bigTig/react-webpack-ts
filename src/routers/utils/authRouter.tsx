/* eslint-disable @typescript-eslint/no-explicit-any */
import { HOME_URL } from '@/config'
import { AxiosCanceler } from '@/core/http/helper/axiosCancel'
import { globalTokenAtom } from '@/store/global'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { rootRouter } from '..'
import { searchRoute } from './'

const axiosCanceler = new AxiosCanceler()

/** 路由守卫组件 */
const AuthRouter = (props: { children: any }) => {
  const { pathname } = useLocation()
  // 3. 判断是否有 Token
  const token = useRecoilValue(globalTokenAtom)

  const route = searchRoute(pathname, rootRouter)
  // 1. 在跳转路由之前，清除所有的请求
  axiosCanceler.removeAllPending()

  // 2. 判断当前路由是否需要访问权限（不需要直接放行）
  if (!route.meta?.auth) return props?.children

  if (!token) return <Navigate to='/login' replace />

  // 4. Dynamic Router(动态路由，根据后台返回的菜单数据生成的一维数组)
  const dynamicRouter: string[] = ['/dashboard/embedded']

  // 5. Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
  const staticRouter = [HOME_URL, '/403']
  const routerList = dynamicRouter.concat(staticRouter)

  // 6. 如果访问的地址没有在路由表中重定向到403页面
  if (routerList.indexOf(pathname) == -1) return <Navigate to='/403' />

  // 7. 当前账号有权限返回 Router，正常访问页面
  return props.children
}

export default AuthRouter
