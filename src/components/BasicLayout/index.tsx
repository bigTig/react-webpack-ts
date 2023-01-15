import { BreadcrumbRouteProps } from '@/global'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, theme } from 'antd'
import React, { useState } from 'react'
import BasicBreadcrumb from '../BasicBreadcrumb'
import BasicHeaderMenu from '../BasicHeaderMenu'
import BasicSider from '../BasicSider'
import LogoBasic from '../Logo'
import RightContent from '../RightContent'
import styles from './index.less'

const { Header, Content, Sider } = Layout

const items1: MenuProps['items'] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map(
  key => ({
    key,
    label: `header-nav ${key}`,
  }),
)

const routes: BreadcrumbRouteProps[] = [
  {
    path: 'index',
    breadcrumbName: 'home',
  },
  {
    path: 'first',
    breadcrumbName: 'first',
  },
  {
    path: 'second',
    breadcrumbName: 'second',
    hideMenu: false,
  },
]

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout className={styles['basic-layout']}>
      <Header className={`${styles['basic-layout-header']}`}>
        {/* logo */}
        <LogoBasic />
        <div className={styles['basic-layout-header-right']}>
          <BasicHeaderMenu menuItems={items1} />
          <RightContent />
        </div>
      </Header>
      <Layout>
        <Sider
          className={styles['basic-sider']}
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={200}
          style={{ background: colorBgContainer }}
        >
          <BasicSider />
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
          <Content>Content</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
