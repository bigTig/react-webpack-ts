import lazyLoad from '@/routers/utils/lazyLoad'
import React from 'react'
import { metaRoutersProps } from '../interface'

// 数据大屏模块
const dataScreenRouter: metaRoutersProps[] = [
  {
    path: '/dataScreen/analysis',
    element: lazyLoad(React.lazy(() => import('@/pages/dataScreen/index'))),
    meta: {
      auth: true,
      title: '数据大屏',
      key: 'dataScreen',
    },
  },
]

export default dataScreenRouter
