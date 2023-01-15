import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import React from 'react'

/**
 * 左侧菜单栏
 * @returns
 */
const BasicSider: React.FC = () => {
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1)

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1
          return {
            key: subKey,
            label: `option${subKey}`,
          }
        }),
      }
    },
  )

  return (
    <Menu
      mode='inline'
      theme='dark'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items2}
    />
  )
}

export default BasicSider
