import { routerArray } from '@/routers'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { systemConfigAtom } from '@/store/config'
import { currentMenuAtom, menuAtom, screenWidthAtom } from '@/store/menus'
import { findAllBreadcrumb } from '@/utils'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Layout, theme } from 'antd'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import BasicBreadcrumb from './components/BasicBreadcrumb'
import BasicHeaderMenu from './components/BasicHeaderMenu'
import BasicSider from './components/BasicSider'
import DefaultSetting from './components/DefaultSetting'
import LogoBasic from './components/Logo'
import RightContent from './components/RightContent'
import styles from './index.less'

const { Header, Content, Sider } = Layout

const { useToken } = theme

const BasicLayout: React.FC = () => {
  const { token } = useToken()
  const [collapsed, setCollapsed] = useState(false)
  const menuRouterState = useRecoilValue(menuAtom)
  const currentMenuState = useRecoilValue(currentMenuAtom)
  const systemConfigState = useRecoilValue(systemConfigAtom)
  const [screenWidthState, setScreenWidthAtom] = useRecoilState(screenWidthAtom)
  const setBreadcrumbAtom = useSetRecoilState(breadcrumbAtom)

  const { sider, pageContainer } = systemConfigState.token
  const { layout, navTheme, siderWidth, breadcrumb } = systemConfigState

  const basicSiderClassName = useEmotionCss(({ token }) => {
    return {
      margin: sider?.marginLayoutMenu,
      marginRight: 0,
      borderRadius: sider?.borderRadiusMenu,
      overflow: sider?.overflow,
      color: token.colorPrimary,
    }
  })

  /** 监听窗口大小变化 */
  useEffect(() => {
    window.onresize = () => {
      return (() => {
        const SCREENWIDTH = document.body.clientWidth
        setScreenWidthAtom(SCREENWIDTH)
      })()
    }
  }, [setScreenWidthAtom])

  useEffect(() => {
    setCollapsed(screenWidthState < 1200)
  }, [screenWidthState])

  /** 构造面包屑数据 */
  useEffect(() => {
    breadcrumb && setBreadcrumbAtom(findAllBreadcrumb(routerArray))
  }, [breadcrumb, setBreadcrumbAtom])

  return (
    <Layout className={styles['basic-layout']}>
      <Header
        className={classNames(
          styles['basic-layout-header'],
          navTheme === 'dark' && styles['basic-layout-header-dark'],
        )}
      >
        {/* logo */}
        <LogoBasic />
        <div className={styles['basic-layout-header-right']}>
          {layout === 'mix' || layout === 'top' ? <BasicHeaderMenu /> : null}
          <RightContent />
        </div>
      </Header>
      <Layout>
        {(menuRouterState.length || layout === 'side') && layout !== 'top' ? (
          <Sider
            className={`${styles['basic-sider']} ${layout === 'mix' && basicSiderClassName}`}
            trigger={null}
            style={{ display: currentMenuState.meta?.hideSide ? 'none' : 'block' }}
            theme={navTheme}
            collapsed={collapsed}
            width={siderWidth}
          >
            <BasicSider isCollapse={collapsed} />

            <div
              className={styles['basic-sider-collapsed']}
              onClick={() => setCollapsed(!collapsed)}
              style={{ color: token.colorPrimary }}
            >
              {!collapsed ? (
                <MenuFoldOutlined style={{ fontSize: 18 }} />
              ) : (
                <MenuUnfoldOutlined style={{ fontSize: 18 }} />
              )}
            </div>
          </Sider>
        ) : null}
        <Layout className={styles['basic-layout-container']}>
          {breadcrumb ? <BasicBreadcrumb /> : null}
          <Content
            style={{
              padding: pageContainer?.paddingInlinePageContainerContent,
              paddingTop: breadcrumb ? 0 : pageContainer?.paddingInlinePageContainerContent,
            }}
          >
            <Outlet></Outlet>
            {/* 悬浮按钮 */}
            <DefaultSetting />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
