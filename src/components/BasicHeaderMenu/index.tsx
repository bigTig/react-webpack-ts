import { MenuItemProps } from '@/config/menus'
import { Menu, MenuProps } from 'antd'
import React from 'react'
import styles from './index.less'

interface BasicHeaderMenu extends MenuProps {
  menuItems: MenuItemProps[]
}

/**
 * 顶部菜单
 * @returns
 */
const BasicHeaderMenu: React.FC<BasicHeaderMenu> = props => {
  const { menuItems, ...other } = props

  return (
    <Menu
      className={styles['basic-layout-header-menu']}
      theme='dark'
      mode='horizontal'
      items={menuItems}
      {...other}
    />
  )
}

export default BasicHeaderMenu
