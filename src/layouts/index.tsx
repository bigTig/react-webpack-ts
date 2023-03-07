import defaultProps from '@/config/defaultProps'
import { menuAtom } from '@/store/menus'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import BasicBreadcrumb from './components/BasicBreadcrumb'
import BasicHeaderMenu from './components/BasicHeaderMenu'
import BasicSider from './components/BasicSider'
import LogoBasic from './components/Logo'
import RightContent from './components/RightContent'
import styles from './index.less'

const { Header, Content, Sider } = Layout

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const menuRouterState = useRecoilValue(menuAtom)

  return (
    <Layout className={styles['basic-layout']}>
      <Header
        className={`${styles['basic-layout-header']} ${
          defaultProps.navTheme === 'light' ? styles['basic-layout-header-light'] : ''
        }`}
      >
        {/* logo */}
        <LogoBasic />
        <div className={styles['basic-layout-header-right']}>
          {defaultProps.layout === 'mix' ? <BasicHeaderMenu /> : null}
          <RightContent />
        </div>
      </Header>
      <Layout>
        {menuRouterState.length || defaultProps.layout === 'side' ? (
          <Sider
            className={styles['basic-sider']}
            trigger={null}
            theme={defaultProps.navTheme}
            collapsed={collapsed}
            width={defaultProps.siderWidth}
          >
            <BasicSider isCollapse={collapsed} />

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
        <Layout className={styles['basic-layout-container']}>
          {defaultProps.breadcrumb ? <BasicBreadcrumb /> : null}
          <Content
            style={{
              padding: defaultProps.token?.pageContainer?.paddingInlinePageContainerContent,
              paddingTop: defaultProps.breadcrumb
                ? 0
                : defaultProps.token?.pageContainer?.paddingInlinePageContainerContent,
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
