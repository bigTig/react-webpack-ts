/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Icons from '@ant-design/icons'
import { MenuProps } from 'antd'
import React from 'react'
import { metaRoutersProps } from '../interface'

// 定义 menu 类型
export type MenuItem = Required<MenuProps>['items'][number]

// const useRouter = () => {}

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons
const addIcon = (name: string) => {
  return React.createElement(customIcons[name])
}

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

export const getOtherMenu = (menuList: metaRoutersProps[], path: string) => {
  const filter = menuList.filter(item => item.path === path)
  return filter[0]
}

/** 处理后台返回菜单 key 值为 antd 菜单需要的 key 值 */
export const deepLoopFloat = (menuList: metaRoutersProps[], newArr: MenuItem[] = []) => {
  menuList.forEach((item: metaRoutersProps) => {
    // 下面判断代码解释 *** !item?.children?.length   ==>   (!item.children || item.children.length === 0)
    if (item.single && item?.children?.length) {
      return newArr.push(
        getItem(
          item.children[0].meta?.title,
          item.children[0].path,
          item.children[0].meta?.icon ? addIcon(item.children[0].meta?.icon) : '',
        ),
      )
    }

    if (!item?.children?.length) {
      return newArr.push(
        getItem(item.meta?.title, item.path, item.meta?.icon ? addIcon(item.meta?.icon) : ''),
      )
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

// export default useRouter
