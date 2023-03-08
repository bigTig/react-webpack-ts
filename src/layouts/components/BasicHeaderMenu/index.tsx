/* eslint-disable @typescript-eslint/no-explicit-any */
import { routerArray } from '@/routers'
import { metaRoutersProps } from '@/routers/interface'
import { deepLoopFloat, getFirstMenu, getOtherMenu, MenuItem } from '@/routers/utils/useRouter'
import { systemConfigAtom } from '@/store/config'
import { menuAtom } from '@/store/menus'
import { Menu, MenuProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import styles from './index.less'

/**
 * 顶部菜单
 * @returns
 */
const BasicHeaderMenu: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const setMenuAtom = useSetRecoilState(menuAtom)
  const systemConfigState = useRecoilValue(systemConfigAtom)
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  const { navTheme } = systemConfigState

  // 点击当前菜单跳转页面
  const clickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    const router: metaRoutersProps = getOtherMenu(routerArray, key)
    if (router.single && router.children) {
      navigate(router.children[0].path)
      setMenuAtom([])
    } else {
      const path: any = router.children && router.children[0].path
      navigate(path)
      setMenuAtom(router.children as metaRoutersProps[])
    }
  }

  useEffect(() => {
    setMenuList(deepLoopFloat(getFirstMenu(routerArray)))
  }, [])

  useEffect(() => {
    const path = `/${pathname.split('/')[1]}`
    setSelectedKeys([path])
    const router = getOtherMenu(routerArray, path)
    if (router.single && router.children) {
      navigate(router.children[0].path)
      setMenuAtom([])
    } else {
      setMenuAtom(router.children as metaRoutersProps[])
    }
  }, [navigate, pathname, setMenuAtom])

  return (
    <Menu
      className={styles['basic-layout-header-menu']}
      theme={navTheme}
      mode='horizontal'
      selectedKeys={selectedKeys}
      items={menuList}
      onClick={clickMenu}
    />
  )
}

export default BasicHeaderMenu