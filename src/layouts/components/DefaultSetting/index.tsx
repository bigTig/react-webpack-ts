/* eslint-disable @typescript-eslint/no-explicit-any */
import { systemConfigAtom } from '@/store/config'
import {
  BgColorsOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  SettingOutlined,
  SoundOutlined,
} from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Alert, Button, Divider, Drawer, FloatButton, message, Space } from 'antd'
import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styles from './index.less'

const Style = [
  { label: 'light', value: 'light' },
  { label: 'dark', value: 'dark' },
]
const Sider = [
  { label: 'light', value: 'side' },
  { label: 'dark', value: 'mix' },
]
const Primary = [
  { label: 'light', value: '#00b96b' },
  { label: 'dark', value: '#1890ff' },
  { label: 'dark', value: '#722ed1' },
  { label: 'dark', value: '#faad14' },
]

/** 默认设置 - 主题-整体风格设置 */
const DefaultSetting: React.FC = () => {
  const [systemConfigState, setSystemConfigAtom] = useRecoilState(systemConfigAtom)
  const [drawerOpen, setDrawerOpen] = useState(true)

  const settingDrawerBlockItemCheckbox = useEmotionCss(({ token }) => {
    return {
      outline: `1px solid ${token.colorPrimary}`,
    }
  })

  return (
    <>
      <FloatButton.Group
        trigger='click'
        type='primary'
        style={{ right: 24 }}
        icon={<SettingOutlined />}
      >
        <FloatButton icon={<BgColorsOutlined />} onClick={() => setDrawerOpen(true)} />
      </FloatButton.Group>
      <Drawer
        placement='right'
        open={drawerOpen}
        width={300}
        closable={false}
        onClose={() => setDrawerOpen(false)}
      >
        <div className={styles['setting-container']}>
          <div className={styles['close-icon']} onClick={() => setDrawerOpen(false)}>
            <CloseOutlined />
          </div>
          <div>
            <Divider orientation='left' orientationMargin='0'>
              整体风格设置
            </Divider>
            <div className={styles['setting-drawer-block']}>
              {Style.map((el: any) => (
                <div
                  key={el.value}
                  className={classNames(
                    styles['setting-drawer-block-item'],
                    systemConfigState.navTheme === el.value && settingDrawerBlockItemCheckbox,
                    styles[`setting-drawer-block-item-${el}`],
                  )}
                  onClick={() => {
                    setSystemConfigAtom({ ...systemConfigState, navTheme: el.value })
                  }}
                />
              ))}
            </div>
            <Divider orientation='left' orientationMargin='0'>
              主题色
            </Divider>
            <div className={styles['theme-color']}>
              {Primary.map(el => (
                <div
                  key={el.value}
                  className={styles['theme-color-block']}
                  style={{ backgroundColor: el.value }}
                  onClick={() =>
                    setSystemConfigAtom({
                      ...systemConfigState,
                      token: {
                        ...systemConfigState.token,
                        token: {
                          ...systemConfigState.token.token,
                          colorPrimary: el.value,
                        },
                      },
                    })
                  }
                >
                  {systemConfigState.token.token?.colorPrimary === el.value ? (
                    <CheckOutlined />
                  ) : null}
                </div>
              ))}
            </div>
            <Divider orientation='left' orientationMargin='0'>
              导航模式
            </Divider>
            <div className={styles['setting-drawer-block']}>
              {Sider.map((el: any) => (
                <div
                  key={el.value}
                  className={classNames(
                    styles['setting-drawer-block-item'],
                    systemConfigState.layout === el.value && settingDrawerBlockItemCheckbox,
                    styles[`setting-drawer-block-item-${el}`],
                  )}
                  onClick={() => {
                    setSystemConfigAtom({ ...systemConfigState, layout: el.value })
                  }}
                />
              ))}
            </div>
          </div>
          <Space direction='vertical' size='large'>
            <Alert
              type='warning'
              icon={<SoundOutlined />}
              description='配置栏只在开发环境用于预览，生产环境不会展现，请拷贝后手动修改配置文件'
              showIcon
            />
            <Button
              block
              icon={<CopyOutlined />}
              onClick={() => {
                const flag = copy(JSON.stringify(systemConfigState))
                if (flag) {
                  message.success('拷贝成功，请到 src/config/defaultProps.tsx 中替换默认配置')
                }
              }}
            >
              拷贝设置
            </Button>
          </Space>
        </div>
      </Drawer>
    </>
  )
}

export default DefaultSetting
