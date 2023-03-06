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

const BasicLayout: React.FC = () => {
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
          <BasicSider isCollapse={collapsed} />

          <div className={styles['basic-sider-collapsed']} onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? (
              <MenuFoldOutlined style={{ fontSize: 18 }} />
            ) : (
              <MenuUnfoldOutlined style={{ fontSize: 18 }} />
            )}
          </div>
        </Sider>
        <Layout className={styles['basic-layout-container']}>
          <BasicBreadcrumb />
          <Content>
            <Outlet></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default BasicLayout
