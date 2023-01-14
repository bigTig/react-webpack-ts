import Demo from '@/pages/Demo'
import Demo1 from '@/pages/Demo1'
import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'
import React from 'react'

export const MenuConfig = [
  {
    path: '/welcome',
    name: '欢迎',
    icon: <SmileFilled />,
    component: './welcome',
  },
  {
    path: '/demo',
    name: 'demo',
    icon: <SmileFilled />,
    component: './demo',
  },
  {
    path: '/admin',
    name: '管理页',
    icon: <CrownFilled />,
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page1',
      },
      {
        path: 'sub-page1',
        name: '一级页面',
        icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        component: <Demo />,
      },
      {
        path: 'sub-page2',
        name: '二级页面',
        icon: <CrownFilled />,
        component: <Demo1 />,
      },
      {
        path: 'sub-page3',
        name: '三级页面',
        icon: <CrownFilled />,
        component: <Demo />,
      },
    ],
  },
  {
    name: '列表页',
    icon: <TabletFilled />,
    path: '/list',
    routes: [
      {
        path: 'sub-page',
        name: '列表页面',
        icon: <CrownFilled />,
        routes: [
          {
            path: 'sub-sub-page1',
            name: '一一级列表页面',
            icon: <CrownFilled />,
            component: <Demo />,
            hideInMenu: false,
          },
          {
            path: 'sub-sub-page2',
            name: '一二级列表页面',
            icon: <CrownFilled />,
            component: <Demo />,
          },
          {
            path: 'sub-sub-page3',
            name: '一三级列表页面',
            icon: <CrownFilled />,
            component: <Demo />,
          },
        ],
      },
      {
        path: 'sub-page2',
        name: '二级列表页面',
        icon: <CrownFilled />,
        component: <Demo1 />,
      },
      {
        path: 'sub-page3',
        name: '三级列表页面',
        icon: <CrownFilled />,
        component: <Demo />,
      },
    ],
  },
]
