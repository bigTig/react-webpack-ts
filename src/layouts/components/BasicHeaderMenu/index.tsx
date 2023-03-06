import { Menu } from 'antd'
import React from 'react'
import styles from './index.less'

/**
 * 顶部菜单
 * @returns
 */
const BasicHeaderMenu: React.FC = () => {
  return (
    <Menu
      className={styles['basic-layout-header-menu']}
      theme='dark'
      mode='horizontal'
      items={[]}
    />
  )
}

export default BasicHeaderMenu
