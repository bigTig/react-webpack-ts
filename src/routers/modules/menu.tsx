import BasicLayout from '@/layouts'
import lazyLoad from '@/routers/utils/lazyLoad'
import React from 'react'
import { metaRoutersProps } from '../interface'

// menu 模块
const menuRouter: Array<metaRoutersProps> = [
  {
    element: <BasicLayout />,
    path: '/menu',
    meta: {
      title: '嵌套菜单',
      key: 'menu',
      icon: 'ProfileOutlined',
    },
    children: [
      {
        path: '/menu/menu1',
        element: lazyLoad(React.lazy(() => import('@/pages/menu/menu1/index'))),
        meta: {
          title: '菜单1',
          key: 'menu1',
        },
      },
      {
        path: '/menu/menu2',
        children: [
          {
            path: '/menu/menu2/menu21',
            element: lazyLoad(React.lazy(() => import('@/pages/menu/menu2/menu21/index'))),
            meta: {
              title: '菜单2-1',
              key: 'menu21',
            },
          },
          {
            path: '/menu/menu2/menu22',
            children: [
              {
                path: '/menu/menu2/menu22/menu221',
                element: lazyLoad(
                  React.lazy(() => import('@/pages/menu/menu2/menu22/menu221/index')),
                ),
                meta: {
                  title: '菜单2-2-1',
                  key: 'menu221',
                },
              },
              {
                path: '/menu/menu2/menu22/menu222',
                element: lazyLoad(
                  React.lazy(() => import('@/pages/menu/menu2/menu22/menu222/index')),
                ),
                meta: {
                  hideMenu: true,
                  hideSide: true,
                  title: '菜单2-2-2',
                  key: 'menu222',
                },
              },
            ],
            meta: {
              title: '菜单2-2',
              key: 'menu221',
            },
          },
          {
            path: '/menu/menu2/menu23',
            element: lazyLoad(React.lazy(() => import('@/pages/menu/menu2/menu23/index'))),
            meta: {
              title: '菜单2-3',
              key: 'menu23',
            },
          },
        ],
        meta: {
          title: '菜单2-1',
          key: 'menu21',
        },
      },
      {
        path: '/menu/menu3',
        element: lazyLoad(React.lazy(() => import('@/pages/menu/menu3/index'))),
        meta: {
          title: '菜单3',
          key: 'menu3',
        },
      },
    ],
  },
]

export default menuRouter
