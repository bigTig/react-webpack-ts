import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import React from 'react'

export interface MenuItemProps extends MenuItemType {
  icon: React.ReactNode
  component?: string
  redirect?: string
  children?: MenuItemProps[]
}

export const MenuConfig: MenuItemProps[] = [
  {
    key: '/welcome',
    label: '欢迎',
    icon: <SmileFilled />,
    component: './welcome',
  },
  {
    key: '/demo',
    label: 'demo',
    icon: <SmileFilled />,
    component: './demo',
  },
  {
    key: '/admin',
    label: '管理页',
    icon: <CrownFilled />,
    redirect: '/admin/sub-page1',
    children: [
      {
        key: 'sub-page1',
        label: '一级页面',
        icon: <CrownFilled />,
        component: './Demo1',
      },
      {
        key: 'sub-page2',
        label: '二级页面',
        icon: <CrownFilled />,
        component: './Demo1',
      },
      {
        key: 'sub-page3',
        label: '三级页面',
        icon: <CrownFilled />,
        component: '',
      },
    ],
  },
  {
    key: '/list',
    label: '列表页',
    icon: <TabletFilled />,
    redirect: '/list/sub-page/sub-sub-page1',
    children: [
      {
        key: 'sub-page',
        label: '列表页面',
        icon: <CrownFilled />,
        children: [
          {
            key: 'sub-sub-page1',
            label: '一一级列表页面',
            icon: <CrownFilled />,
            component: './Demo1',
          },
          {
            key: 'sub-sub-page2',
            label: '一二级列表页面',
            icon: <CrownFilled />,
            component: './Demo1',
          },
          {
            key: 'sub-sub-page3',
            label: '一三级列表页面',
            icon: <CrownFilled />,
            component: './Demo1',
          },
        ],
      },
      {
        key: 'sub-page2',
        label: '二级列表页面',
        icon: <CrownFilled />,
        component: './Demo1',
      },
      {
        key: 'sub-page3',
        label: '三级列表页面',
        icon: <CrownFilled />,
        component: './Demo1',
      },
    ],
  },
]
