/* eslint-disable @typescript-eslint/no-explicit-any */
import { globalSystemConfigAtom } from '@/store/global'
import {
  ApartmentOutlined,
  BgColorsOutlined,
  CameraOutlined,
  CheckOutlined,
  CloseOutlined,
  CopyOutlined,
  LayoutOutlined,
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
  { label: '小黄人', value: '#f2d318' },
  { label: '蓝', value: '#065bc5' },
]

/** 默认设置 - 主题-整体风格设置 */
const DefaultSetting: React.FC = () => {
  const [globalSystemConfigState, setGlobalSystemConfigAtom] =
    useRecoilState(globalSystemConfigAtom)
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
            <Divider orientation='center' orientationMargin='0'>
              <LayoutOutlined style={{ marginRight: 5 }} />
              整体风格设置
            </Divider>
            <div className={styles['setting-drawer-block']}>
              {Style.map((el: any) => (
                <Tooltip title={el.label} key={el.value}>
                  <div
                    className={classNames(
                      styles['setting-drawer-block-item'],
                      globalSystemConfigState.navTheme === el.value &&
                        settingDrawerBlockItemCheckbox,
                      styles[`setting-drawer-block-item-${el.value}`],
                    )}
                    onClick={() => {
                      setGlobalSystemConfigAtom({ ...globalSystemConfigState, navTheme: el.value })
                    }}
                  />
                </Tooltip>
              ))}
            </div>
            <Divider orientation='center' orientationMargin='0'>
              <BgColorsOutlined style={{ marginRight: 5 }} />
              主题色
            </Divider>
            <div className={styles['theme-color']}>
              {Primary.map(el => (
                <Tooltip title={el.label} key={el.value}>
                  <div
                    className={styles['theme-color-block']}
                    style={{ backgroundColor: el.value }}
                    onClick={() =>
                      setGlobalSystemConfigAtom({
                        ...globalSystemConfigState,
                        token: {
                          ...globalSystemConfigState.token,
                          token: {
                            ...globalSystemConfigState.token.token,
                            colorPrimary: el.value,
                          },
                        },
                      })
                    }
                  >
                    {globalSystemConfigState.token.token?.colorPrimary === el.value ? (
                      <CheckOutlined />
                    ) : null}
                  </div>
                </Tooltip>
              ))}
            </div>
            <Divider orientation='center' orientationMargin='0'>
              <ApartmentOutlined style={{ marginRight: 5 }} />
              导航模式
            </Divider>
            <div className={styles['setting-drawer-block']}>
              {Sider.map((el: any) => (
                <Tooltip title={el.label} key={el.value}>
                  <div
                    className={classNames(
                      styles['setting-drawer-block-item'],
                      globalSystemConfigState.layout === el.value && settingDrawerBlockItemCheckbox,
                      styles[`setting-drawer-block-item-${el.value}`],
                    )}
                    onClick={() => {
                      setGlobalSystemConfigAtom({ ...globalSystemConfigState, layout: el.value })
                    }}
                  />
                </Tooltip>
              ))}
            </div>
            <Divider orientation='center' orientationMargin='0'>
              <CameraOutlined style={{ marginRight: 5 }} />
              内容区域
            </Divider>
            <ul className={styles['container-setting']}>
              <Space direction='vertical' size='middle'>
                <li className={styles['container-setting-item']}>
                  <span>面包屑</span>
                  <Switch
                    defaultChecked
                    size='small'
                    checked={globalSystemConfigState.breadcrumb}
                    onChange={e =>
                      setGlobalSystemConfigAtom({ ...globalSystemConfigState, breadcrumb: e })
                    }
                  />
                </li>
                <li className={styles['container-setting-item']}>
                  <span>页脚</span>
                  <Switch
                    defaultChecked
                    size='small'
                    checked={globalSystemConfigState.footer}
                    onChange={e =>
                      setGlobalSystemConfigAtom({ ...globalSystemConfigState, footer: e })
                    }
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
                const flag = copy(JSON.stringify(globalSystemConfigState))
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
