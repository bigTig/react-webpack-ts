/* eslint-disable @typescript-eslint/no-explicit-any */
import { BgColorsOutlined, LayoutOutlined, SettingOutlined } from '@ant-design/icons'
import { FloatButton, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LayoutEditor from '../LayoutEditor'

/** 默认设置 - 主题-整体风格设置 */
const DefaultSetting: React.FC = () => {
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(false)

  const FloatButtonSource = [
    { icon: <LayoutOutlined />, label: 'Layout', onClick: () => setDrawerOpen(true) },
    {
      icon: <BgColorsOutlined />,
      label: 'ThemeEditor',
      onClick: () => navigate('/dashboard/themeEditor'),
    },
  ]

  return (
    <>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{ right: 24 }}
        icon={<SettingOutlined />}
      >
        {FloatButtonSource.map(el => (
          <Tooltip title={el.label} key={el.label} placement='left'>
            <FloatButton key={el.label} icon={el.icon} onClick={el.onClick} />
          </Tooltip>
        ))}
      </FloatButton.Group>
      <LayoutEditor open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default DefaultSetting
