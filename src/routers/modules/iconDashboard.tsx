import BasicLayout from '@/layouts'
import React from 'react'
import { metaRoutersProps } from '../interface'
import lazyLoad from '../utils/lazyLoad'

// 首页模块
const iconRouter: Array<metaRoutersProps> = [
  {
    element: <BasicLayout />,
    path: '/icon',
    meta: {
      title: 'Demo',
      key: 'Demo',
      icon: 'CameraOutlined',
      auth: true,
    },
    children: [
      {
        path: '/icon/index',
        element: lazyLoad(React.lazy(() => import('@/pages/iconDashboard'))),
        meta: {
          title: 'Svg图标',
          key: 'svg',
          icon: 'AppstoreOutlined',
          auth: true,
        },
      },
      {
        path: '/icon/threeVR',
        element: lazyLoad(React.lazy(() => import('@/pages/threeVR'))),
        meta: {
          title: 'ThreeVR',
          key: 'ThreeVR',
          icon: 'RocketOutlined',
          auth: true,
        },
      },
    ],
  },
]

export default iconRouter
