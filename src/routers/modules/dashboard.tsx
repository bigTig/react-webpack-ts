import BasicLayout from '@/layouts'
import lazyLoad from '@/routers/utils/lazyLoad'
import React from 'react'
import { metaRoutersProps } from '../interface'

// dashboard 模块
const dashboardRouter: metaRoutersProps[] = [
  {
    element: <BasicLayout />,
    path: '/dashboard',
    meta: {
      title: 'Dashboard',
      key: 'dashboard',
      icon: 'AreaChartOutlined',
      auth: true,
    },
    children: [
      {
        path: '/dashboard/analysis',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard/analysis/index'))),
        meta: {
          title: '分析页',
          key: 'dataVisualize',
          auth: true,
          keepAlive: true,
        },
      },
      {
        path: '/dashboard/embedded',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard/embedded/index'))),
        meta: {
          title: '内嵌页面',
          key: 'embedded',
          auth: true,
        },
      },
      {
        path: '/dashboard/themeEditor',
        element: lazyLoad(React.lazy(() => import('@/pages/themeEditor/index'))),
        meta: {
          hideMenu: true,
          hideSide: true,
          title: '主题编辑器',
          key: 'themeEditor',
        },
      },
    ],
  },
]

export default dashboardRouter
