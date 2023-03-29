/* eslint-disable @typescript-eslint/no-explicit-any */
import Login from '@/pages/login'
import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
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
    element: <Navigate to='/login' />,
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

const Router = () => {
  const routes = useRoutes(rootRouter)
  return routes
}

export default Router
