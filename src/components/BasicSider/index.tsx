import { Menu, MenuProps } from 'antd'
import React from 'react'

interface BasicSiderProps extends MenuProps {
  routes: MenuProps['items']
}

/**
 * 左侧菜单栏
 * @returns
 */
const BasicSider: React.FC<BasicSiderProps> = props => {
  const { routes, ...other } = props

  return (
    <Menu
      mode='inline'
      theme='dark'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      items={routes}
      {...other}
    />
  )
}

export default BasicSider
