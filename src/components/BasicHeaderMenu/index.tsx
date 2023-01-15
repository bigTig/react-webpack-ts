import { Menu, MenuProps } from 'antd'
import React from 'react'
import styles from './index.less'

type BasicHeaderMenu = {
  menuItems: MenuProps['items']
}

/**
 * 顶部菜单
 * @returns
 */
const BasicHeaderMenu: React.FC<BasicHeaderMenu> = props => {
  return (
    <Menu
      className={styles['basic-layout-header-menu']}
      theme='dark'
      mode='horizontal'
      defaultSelectedKeys={['2']}
      items={props.menuItems}
    />
  )
}

export default BasicHeaderMenu
