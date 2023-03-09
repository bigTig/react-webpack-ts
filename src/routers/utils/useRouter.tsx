/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from '@ant-design/icons'
import { MenuProps } from 'antd'
import React from 'react'
import { metaRoutersProps } from '../interface'

// 定义 menu 类型
export type MenuItem = Required<MenuProps>['items'][number]

/** 动态渲染 Icon 图标 */
const customIcons: { [key: string]: any } = Icons
const addIcon = (name: string) => {
  return React.createElement(customIcons[name])
}

/** 构造 Menu 所需数据格式 */
export const getItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

/** 获取路由一级菜单 */
export const getFirstMenu = (menuList: metaRoutersProps[]) => {
  const newArr: metaRoutersProps[] = []
  menuList.forEach((item: metaRoutersProps) => {
    const { meta, path, element, single, children } = item
    if (single && children) {
      newArr.push({ meta: children[0].meta, path, element })
    } else {
      newArr.push({ meta, path, element })
    }
  })
  return newArr
}

/** 获取一级菜单下的所有子菜单 */
export const getOtherMenu = (menuList: metaRoutersProps[], path: string) => {
  const filter = menuList.filter(item => item.path === path)
  return filter[0]
}

/** 处理后台返回菜单 key 值为 antd 菜单需要的 key 值 */
export const deepLoopFloat = (menuList: metaRoutersProps[], newArr: MenuItem[] = []) => {
  menuList.forEach((item: metaRoutersProps) => {
    // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
    // 只有一级菜单，直接拿 children[0]
    if (item.single && item?.children?.length) {
      // eslint-disable-next-line no-unsafe-optional-chaining
      const { meta, path } = item?.children[0]
      // 隐藏的菜单不加进去
      if (meta?.hideMenu) return newArr

      return newArr.push(getItem(meta?.title, path, meta?.icon ? addIcon(meta?.icon) : ''))
    }

    // 没有 children
    if (!item?.children?.length) {
      const { meta, path } = item
      // 隐藏的菜单不加进去
      if (meta?.hideMenu) return newArr

      return newArr.push(getItem(meta?.title, path, meta?.icon ? addIcon(meta?.icon) : ''))
    }

    newArr.push(
      getItem(
        item.meta?.title,
        item.path,
        item.meta?.icon ? addIcon(item.meta?.icon) : '',
        deepLoopFloat(item.children),
      ),
    )
  })
  return newArr
}
