import { MenuItemProps } from '@/config/menus'
import { BreadcrumbRouteProps } from '@/global'
import useMenus from '@/hooks/useMenu'
import { RenderRoutes } from '@/router/router'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BasicBreadcrumb from '../BasicBreadcrumb'
import BasicHeaderMenu from '../BasicHeaderMenu'
import BasicSider from '../BasicSider'
import LogoBasic from '../Logo'
import RightContent from '../RightContent'
import styles from './index.less'

const { Header, Content, Sider } = Layout

const routes: BreadcrumbRouteProps[] = [
  {
    path: '/index',
    breadcrumbName: 'home',
  },
  {
    path: '/first',
    breadcrumbName: 'first',
  },
  {
    path: '/second',
    breadcrumbName: 'second',
    hideMenu: false,
  },
]

export interface BasicLayoutProps {
  menus: MenuItemProps[]
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { menus } = props
  const navigate = useNavigate()
  const [headerMenu] = useMenus()
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  const pathname = useLocation().pathname
  const urls = pathname.slice(1).split('/')

  const [collapsed, setCollapsed] = useState(false)
  const [sideMenu, setSideMenu] = useState<MenuItemProps[]>([])
  const [defaultSelectKey, setDefaultSelectKey] = useState<{
    headerSelectKey: string[]
    sideSelectKey: string[]
    openKeys: string[]
  }>({
    headerSelectKey: [],
    sideSelectKey: [],
    openKeys: [],
  })

  useEffect(() => {
    getSideMenu(`/${urls[0]}`, [`/${urls[0]}`])
  }, [])

  const handleHeaderMenu = (key: string, keyPath: string[]) => {
    getSideMenu(key, keyPath)
  }

  /**
   * 通过头菜单获取左侧菜单
   * @param key 头菜单的key
   * @param keyPath 头菜单的[key]
   */
  const getSideMenu = (key: string, keyPath: string[]) => {
    const childMenu = menus.find(item => item.key === key)

    if (childMenu?.redirect) {
      const redirect = childMenu.redirect.slice(1)
      navigate(childMenu.redirect)

      const keys = redirect
        .split('/')
        .filter(el => el !== key.slice(1))
        .reverse()

      setDefaultSelectKey({
        ...defaultSelectKey,
        headerSelectKey: keyPath,
        sideSelectKey: keys,
        openKeys: keys,
      })
    } else {
      navigate(key)
      setDefaultSelectKey({
        headerSelectKey: keyPath,
        sideSelectKey: [],
        openKeys: [],
      })
    }
    if (childMenu && childMenu.children?.length) {
      setSideMenu(childMenu.children)
    } else {
      setSideMenu([])
    }
    filterBreadcrumbRoutes()
  }

  const handleSideMenuSelect = (keyPath: string[]) => {
    const url = `${defaultSelectKey.headerSelectKey}/${keyPath.reverse()?.join('/')}`

    navigate(url)
    setDefaultSelectKey({
      ...defaultSelectKey,
      sideSelectKey: keyPath,
      openKeys: keyPath,
    })
  }

  const handleSideMenuOpen = (keys: string[]) => {
    const latestOpenKey = keys.find(key => defaultSelectKey.openKeys.indexOf(key) === -1)

    setDefaultSelectKey({
      ...defaultSelectKey,
      openKeys: latestOpenKey ? [latestOpenKey] : [],
    })
  }

  const filterBreadcrumbRoutes = () => {
    console.log(1)
  }

  return (
    <Layout className={styles['basic-layout']}>
      <Header className={`${styles['basic-layout-header']}`}>
        {/* logo */}
        <LogoBasic />
        <div className={styles['basic-layout-header-right']}>
          <BasicHeaderMenu
            menuItems={headerMenu || []}
            selectedKeys={defaultSelectKey.headerSelectKey}
            onClick={({ key, keyPath }) => {
              if (key) {
                handleHeaderMenu(key, keyPath)
              }
            }}
          />
          <RightContent />
        </div>
      </Header>
      <Layout>
        {sideMenu.length ? (
          <Sider
            className={styles['basic-sider']}
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={200}
            style={{ background: colorBgContainer }}
          >
            <BasicSider
              routes={sideMenu}
              selectedKeys={defaultSelectKey.sideSelectKey}
              openKeys={defaultSelectKey.openKeys}
              onOpenChange={keys => handleSideMenuOpen(keys)}
              onSelect={({ keyPath }) => handleSideMenuSelect(keyPath)}
            />

            <div
              className={styles['basic-sider-collapsed']}
              onClick={() => setCollapsed(!collapsed)}
            >
              {!collapsed ? (
                <MenuFoldOutlined style={{ fontSize: 18 }} />
              ) : (
                <MenuUnfoldOutlined style={{ fontSize: 18 }} />
              )}
            </div>
          </Sider>
        ) : null}
        <Layout style={{ padding: '0 12px 12px' }}>
          <BasicBreadcrumb routes={routes} />
          <Content>{RenderRoutes()}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
