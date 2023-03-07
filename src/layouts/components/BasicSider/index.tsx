/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import defaultProps from '@/config/defaultProps'
import { routerArray } from '@/routers'
import { deepLoopFloat } from '@/routers/utils/useRouter'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { menuAtom } from '@/store/menus'
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
  const menuRouterState = useRecoilValue(menuAtom)
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

  useEffect(() => {
    console.log(routerArray)
    defaultProps.layout === 'side'
      ? setMenuList(deepLoopFloat(routerArray))
      : setMenuList(deepLoopFloat(menuRouterState))

    setBreadcrumbAtom(findAllBreadcrumb(routerArray))
  }, [menuRouterState, setBreadcrumbAtom])

  return (
    <Menu
      theme={defaultProps.navTheme}
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
