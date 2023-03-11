/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { routerArray } from '@/routers'
import { deepLoopFloat } from '@/routers/utils/useRouter'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { systemConfigAtom } from '@/store/config'
import { currentMenuAtom, menuAtom } from '@/store/menus'
import { findAllBreadcrumb, getOpenKeys, searchRoute } from '@/utils'
import { Menu, MenuProps } from 'antd'
import MenuItem from 'antd/es/menu/MenuItem'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'

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
  const setCurrentMenuAtom = useSetRecoilState(currentMenuAtom)
  const systemConfigState = useRecoilValue(systemConfigAtom)
  const menuRouterState = useRecoilValue(menuAtom)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<MenuItem[]>([])

  const { layout, navTheme } = systemConfigState

  /** 刷新页面菜单保持高亮 */
  useEffect(() => {
    setSelectedKeys([pathname])
    isCollapse ? null : setOpenKeys(getOpenKeys(pathname))
  }, [pathname, isCollapse, menuList])

  /** 根据默认配置获取菜单数据 */
  useEffect(() => {
    setMenuList(deepLoopFloat(layout === 'side' ? routerArray : menuRouterState))
  }, [menuRouterState, layout])

  /** 构造面包屑数据 */
  useEffect(() => {
    setBreadcrumbAtom(findAllBreadcrumb(routerArray))
  }, [setBreadcrumbAtom])

  /** 刷新后根据地址栏获取当前路由 */
  useEffect(() => {
    const route = searchRoute(pathname, routerArray)
    setCurrentMenuAtom(route)
  }, [pathname, setCurrentMenuAtom])

  /** 点击当前菜单跳转页面 */
  const navigate = useNavigate()
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    const route = searchRoute(key, menuList)
    if (route.isLink) window.open(route.isLink, '_blank')
    navigate(key)
  }

  /** 打开菜单栏 */
  const onOpenChange = (openKeys: string[]) => {
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys)
    const latestOpenKey = openKeys[openKeys.length - 1]
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys)
    setOpenKeys([latestOpenKey])
  }

  return (
    <Menu
      theme={navTheme}
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
