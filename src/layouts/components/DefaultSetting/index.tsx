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
import { Alert, Button, Divider, Drawer, FloatButton, message, Space, Switch, Tooltip } from 'antd'
import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import styles from './index.less'

const Style = [
  { label: '亮色菜单风格', value: 'light' },
  { label: '暗色菜单风格', value: 'dark' },
]
const Sider = [
  { label: '侧边菜单布局', value: 'side' },
  { label: '顶部菜单布局', value: 'mix' },
  { label: '混合菜单布局', value: 'top' },
]
const Primary = [
  { label: '极光绿（默认）', value: '#00b96b' },
  { label: '拂晓蓝', value: '#1890ff' },
  { label: '酱紫', value: '#722ed1' },
  { label: '日暮', value: '#faad14' },
]

/** 默认设置 - 主题-整体风格设置 */
const DefaultSetting: React.FC = () => {
  const [systemConfigState, setSystemConfigAtom] = useRecoilState(systemConfigAtom)
  const [drawerOpen, setDrawerOpen] = useState(false)

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
                <Tooltip title={el.label} key={el.value}>
                  <div
                    className={classNames(
                      styles['setting-drawer-block-item'],
                      systemConfigState.navTheme === el.value && settingDrawerBlockItemCheckbox,
                      styles[`setting-drawer-block-item-${el.value}`],
                    )}
                    onClick={() => {
                      setSystemConfigAtom({ ...systemConfigState, navTheme: el.value })
                    }}
                  />
                </Tooltip>
              ))}
            </div>
            <Divider orientation='left' orientationMargin='0'>
              主题色
            </Divider>
            <div className={styles['theme-color']}>
              {Primary.map(el => (
                <Tooltip title={el.label} key={el.value}>
                  <div
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
                </Tooltip>
              ))}
            </div>
            <Divider orientation='left' orientationMargin='0'>
              导航模式
            </Divider>
            <div className={styles['setting-drawer-block']}>
              {Sider.map((el: any) => (
                <Tooltip title={el.label} key={el.value}>
                  <div
                    className={classNames(
                      styles['setting-drawer-block-item'],
                      systemConfigState.layout === el.value && settingDrawerBlockItemCheckbox,
                      styles[`setting-drawer-block-item-${el.value}`],
                    )}
                    onClick={() => {
                      setSystemConfigAtom({ ...systemConfigState, layout: el.value })
                    }}
                  />
                </Tooltip>
              ))}
            </div>
            <Divider orientation='left' orientationMargin='0'>
              内容区域
            </Divider>
            <ul className={styles['container-setting']}>
              <Space direction='vertical' size='middle'>
                <li className={styles['container-setting-item']}>
                  <span>面包屑</span>
                  <Switch
                    defaultChecked
                    size='small'
                    checked={systemConfigState.breadcrumb}
                    onChange={e => setSystemConfigAtom({ ...systemConfigState, breadcrumb: e })}
                  />
                </li>
                <li className={styles['container-setting-item']}>
                  <span>页脚</span>
                  <Switch
                    defaultChecked
                    size='small'
                    checked={systemConfigState.footer}
                    onChange={e => setSystemConfigAtom({ ...systemConfigState, footer: e })}
                  />
                </li>
              </Space>
            </ul>
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
