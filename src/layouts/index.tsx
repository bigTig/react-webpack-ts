import { MenuItemProps } from '@/config/menus'
import { BreadcrumbRouteProps } from '@/global'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Layout } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import BasicBreadcrumb from './components/BasicBreadcrumb'
import BasicSider from './components/BasicSider'
import LogoBasic from './components/Logo'
import RightContent from './components/RightContent'
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
  menus?: MenuItemProps[]
}

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { menus } = props

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className={styles['basic-layout']}>
      <Header className={`${styles['basic-layout-header']}`}>
        {/* logo */}
        <LogoBasic />
        <div className={styles['basic-layout-header-right']}>
          {/* <BasicHeaderMenu
            menuItems={headerMenu || []}
            selectedKeys={defaultSelectKey.headerSelectKey}
            onClick={({ key, keyPath }) => {
              if (key) {
                handleHeaderMenu(key, keyPath)
              }
            }}
          /> */}
          <RightContent />
        </div>
      </Header>
      <Layout>
        <Sider className={styles['basic-sider']} trigger={null} collapsed={collapsed} width={200}>
          <BasicSider routes={menus} isCollapse={collapsed} />

          <div className={styles['basic-sider-collapsed']} onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? (
              <MenuFoldOutlined style={{ fontSize: 18 }} />
            ) : (
              <MenuUnfoldOutlined style={{ fontSize: 18 }} />
            )}
          </div>
        </Sider>
        <Layout style={{ padding: '0 12px 12px' }}>
          <BasicBreadcrumb routes={routes} />
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
