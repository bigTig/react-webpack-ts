import { CrownFilled, SmileFilled, TabletFilled } from '@ant-design/icons'
import React from 'react'

const tps609606 = require('@/assets/images/common/tps-609-606.png')
const tps884496 = require('@/assets/images/common/tps-884-496.png')

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileFilled />,
        component: './Welcome',
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownFilled />,
        access: 'canAdmin',
        component: './Admin',
        routes: [
          {
            path: '/admin/sub-page1',
            name: '一级页面',
            icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
            component: './Welcome',
          },
          {
            path: '/admin/sub-page2',
            name: '二级页面',
            icon: <CrownFilled />,
            component: './Welcome',
          },
          {
            path: '/admin/sub-page3',
            name: '三级页面',
            icon: <CrownFilled />,
            component: './Welcome',
          },
        ],
      },
      {
        name: '列表页',
        icon: <TabletFilled />,
        path: '/list',
        component: './ListTableList',
        routes: [
          {
            path: '/list/sub-page',
            name: '列表页面',
            icon: <CrownFilled />,
            routes: [
              {
                path: 'sub-sub-page1',
                name: '一一级列表页面',
                icon: <CrownFilled />,
                component: './Welcome',
              },
              {
                path: 'sub-sub-page2',
                name: '一二级列表页面',
                icon: <CrownFilled />,
                component: './Welcome',
              },
              {
                path: 'sub-sub-page3',
                name: '一三级列表页面',
                icon: <CrownFilled />,
                component: './Welcome',
              },
            ],
          },
          {
            path: '/list/sub-page2',
            name: '二级列表页面',
            icon: <CrownFilled />,
            component: './Welcome',
          },
          {
            path: '/list/sub-page3',
            name: '三级列表页面',
            icon: <CrownFilled />,
            component: './Welcome',
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
  bgLayoutImgList: [
    {
      src: tps609606,
      left: 85,
      bottom: 100,
      height: '303px',
    },
    {
      src: tps609606,
      bottom: -68,
      right: -45,
      height: '303px',
    },
    {
      src: tps884496,
      bottom: 0,
      left: 0,
      width: '331px',
    },
  ],
}
