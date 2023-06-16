/* eslint-disable @typescript-eslint/no-explicit-any */
import Login from '@/pages/login'
import { Spin } from 'antd'
import React, { Suspense } from 'react'
import KeepAlive from 'react-activation'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { metaRoutersProps } from './interface'

// * 导入所有router
const metaRouters = require.context('./modules/', true, /\.tsx$/)

// * 处理路由
export const routerArray = metaRouters.keys().reduce((modules: any, path) => {
  const module = metaRouters(path)
  modules = [...modules, ...module.default]

  return modules
}, [])

export const rootRouter: metaRoutersProps[] = [
  {
    path: '/',
    element: <Navigate to='/home/index' />,
  },
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login',
    },
  },
  ...routerArray,
  {
    path: '*',
    element: <Navigate to='/404' />,
  },
]

const loading = (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Spin size='large' style={{ margin: 'auto' }} />
  </div>
)

/** 懒加载处理 */
const syncRouter = (routes: Array<metaRoutersProps>): RouteObject[] => {
  const mRouteTable: RouteObject[] = []
  routes.forEach(item => {
    mRouteTable.push({
      path: item.path,
      element: (
        <Suspense fallback={loading}>
          {item.meta?.keepAlive ? (
            <KeepAlive id={item.path}>{item.element}</KeepAlive>
          ) : (
            item.element
          )}
        </Suspense>
      ),
      children: item.children && syncRouter(item.children),
    })
  })
  return mRouteTable
}

const Router = () => {
  const routes = useRoutes(syncRouter(rootRouter))
  return routes
}

export default Router
