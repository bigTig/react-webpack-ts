import Demo from '@/pages/Demo'
import Demo1 from '@/pages/Demo1'
import { CrownFilled } from '@ant-design/icons'
import { MenuDataItem } from '@ant-design/pro-components'
import React from 'react'

export const RoutesConfig: MenuDataItem[] = [
  {
    path: '/welcome',
    name: '欢迎',
    component: <Demo />,
  },
  {
    path: '/demo',
    name: 'demo',
    component: <Demo1 />,
  },
  {
    path: '/admin/sub-page1',
    name: '一级页面',
    icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
    component: <Demo />,
  },
  {
    path: '/admin/sub-page2',
    name: '二级页面',
    icon: <CrownFilled />,
    component: <Demo1 />,
  },
  {
    path: '/admin/sub-page3',
    name: '三级页面',
    icon: <CrownFilled />,
    component: <Demo />,
  },
  {
    path: '/list/sub-page2',
    name: '二级列表页面',
    icon: <CrownFilled />,
    component: <Demo1 />,
  },
  {
    path: '/list/sub-page3',
    name: '三级列表页面',
    icon: <CrownFilled />,
    component: <Demo1 />,
  },
  {
    path: '/list/sub-page/sub-sub-page1',
    name: '一一级列表页面',
    icon: <CrownFilled />,
    component: <Demo />,
    hideInMenu: false,
  },
  {
    path: '/list/sub-page/sub-sub-page2',
    name: '一二级列表页面',
    icon: <CrownFilled />,
    component: <Demo1 />,
  },
  {
    path: '/list/sub-page/sub-sub-page3',
    name: '一三级列表页面',
    icon: <CrownFilled />,
    component: <Demo />,
  },
]
