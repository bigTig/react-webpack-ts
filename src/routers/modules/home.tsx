import BasicLayout from '@/layouts'
import React from 'react'
import { metaRoutersProps } from '../interface'
import lazyLoad from '../utils/lazyLoad'

// 首页模块
const homeRouter: Array<metaRoutersProps> = [
  {
    element: <BasicLayout />,
    path: '/home',
    single: true,
    children: [
      {
        path: '/home/index',
        element: lazyLoad(React.lazy(() => import('@/pages/home'))),
        meta: {
          title: '首页',
          key: 'home',
          icon: 'HomeOutlined',
          auth: true,
        },
      },
    ],
  },
]

export default homeRouter
