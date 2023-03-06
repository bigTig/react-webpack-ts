/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { routerArray } from '@/routers'
import { metaRoutersProps } from '@/routers/interface'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { findAllBreadcrumb, getOpenKeys, searchRoute } from '@/utils'
import * as Icons from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

interface BasicSiderProps extends MenuProps {
  isCollapse: boolean
}

// 定义 menu 类型
type MenuItem = Required<MenuProps>['items'][number]

/**
 * 左侧菜单栏
 * @returns
 */
const BasicSider: React.FC<BasicSiderProps> = props => {
  const { isCollapse } = props
  const { pathname } = useLocation()
  const setBreadcrumbAtom = useSetRecoilState(breadcrumbAtom)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<MenuItem[]>([])

  // 刷新页面菜单保持高亮
  useEffect(() => {
    setSelectedKeys([pathname])
    isCollapse ? null : setOpenKeys(getOpenKeys(pathname))
  }, [pathname, isCollapse])

  // 点击当前菜单跳转页面
  const navigate = useNavigate()
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    const route = searchRoute(key, menuList)
    if (route.isLink) window.open(route.isLink, '_blank')
    navigate(key)
  }

  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  const getItem = (
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

  const getMenuData = () => {
    setMenuList(deepLoopFloat(routerArray))
    setBreadcrumbAtom(findAllBreadcrumb(routerArray))
  }
  useEffect(() => {
    getMenuData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name])
  }

  // 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
  const deepLoopFloat = (menuList: metaRoutersProps[], newArr: MenuItem[] = []) => {
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

  return (
    <Menu
      theme='dark'
      mode='inline'
      triggerSubMenuAction='click'
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      items={menuList}
      onClick={clickMenu}
      onOpenChange={onOpenChange}
    />
  )
}

export default BasicSider
