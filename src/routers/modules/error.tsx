import lazyLoad from '@/routers/utils/lazyLoad'
import React from 'react'
import { metaRoutersProps } from '../interface'

/** 错误页面模块 */
const errorRouter: metaRoutersProps[] = [
  {
    path: '/403',
    element: lazyLoad(React.lazy(() => import('@/pages/error/403'))),
    meta: {
      title: '403页面',
      key: '403',
      hideMenu: true,
    },
  },
  {
    path: '/404',
    element: lazyLoad(React.lazy(() => import('@/pages/error/404'))),
    meta: {
      title: '404页面',
      key: '404',
      hideMenu: true,
    },
  },
  {
    path: '/500',
    element: lazyLoad(React.lazy(() => import('@/pages/error/500'))),
    meta: {
      title: '500页面',
      hideMenu: true,
      key: '500',
    },
  },
]

export default errorRouter
