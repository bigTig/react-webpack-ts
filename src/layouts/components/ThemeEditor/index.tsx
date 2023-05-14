import { CloseOutlined } from '@ant-design/icons'
import { Drawer, DrawerProps } from 'antd'
import React from 'react'
import styles from './index.less'

/** 主题编辑器 */
const ThemeEditor: React.FC<DrawerProps> = props => {
  return (
    <Drawer placement='left' width='95%' closable={false} {...props}>
      <div className={styles['theme-container']}>
        <div className={styles['close-icon']} onClick={props.onClose}>
          <CloseOutlined />
        </div>
        <div>待开发</div>
      </div>
    </Drawer>
  )
}

export default ThemeEditor
