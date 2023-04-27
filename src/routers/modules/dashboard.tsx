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
        path: '/dashboard/dataVisualize',
        element: lazyLoad(React.lazy(() => import('@/pages/dashboard/dataVisualize/index'))),
        meta: {
          title: '数据可视化',
          key: 'dataVisualize',
          auth: true,
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
        path: '/dashboard/iframe',
        meta: {
          title: 'iframe嵌套页面',
          key: 'iframe',
          iframeUrl: 'https://www.bing.com/?mkt=zh-cn',
        },
      },
    ],
  },
]

export default dashboardRouter
