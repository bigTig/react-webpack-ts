/* eslint-disable react/prop-types */
import defaultProps from '@/config/defaultProps'
import defaultSetting from '@/config/defaultSettings'
import { MenuConfig } from '@/config/menus'
import {
  PageContainer,
  ProConfigProvider,
  ProLayout,
  ProSettings,
  SettingDrawer,
} from '@ant-design/pro-components'
import { css } from '@emotion/css'
import { Route } from 'antd/es/breadcrumb/Breadcrumb'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RightContent from '../RightContent'

type LayoutProps = {
  content: React.ReactNode
}

const locaPathname = window.location.pathname

const Layout = (props: LayoutProps) => {
  console.log(locaPathname)
  const [pathname, setPathname] = useState(locaPathname)
  const navigate = useNavigate()

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>(defaultSetting)

  // 是否显示 side
  const [isHideSide] = useState(false)

  return (
    <ProConfigProvider hashed={false}>
      <ProLayout
        hide={isHideSide}
        prefixCls='react-prefix'
        route={{ routes: MenuConfig }}
        {...defaultProps}
        location={{
          pathname,
        }}
        menu={{
          collapsedShowGroupTitle: true,
        }}
        actionsRender={undefined}
        rightContentRender={() => <RightContent />}
        headerTitleRender={(logo, title, _) => {
          const defaultDom = (
            <a>
              {logo}
              {title}
            </a>
          )
          if (document.body.clientWidth < 1400) {
            return defaultDom
          }
          if (_.isMobile) return defaultDom
          return <>{defaultDom}</>
        }}
        menuFooterRender={undefined}
        onMenuHeaderClick={e => console.log(e)}
        itemRender={(route, params, routes: Array<Route>) => {
          const last = routes.indexOf(route) === routes.length - 1
          // const isHideMenu
          // console.log(route)

          return last ? (
            <>
              {/* <span
                className={css`
                  width: 68px;
                  height: 32px;
                  background: #ffffff;
                  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
                  border-radius: 4px;
                  padding: 5px 11px;
                  line-height: 22px;
                  cursor: pointer;
                  display: inline-block;
                  text-align: center;
                  user-select: none;
                `}
              >
                <LeftOutlined style={{ marginRight: 5, fontSize: 12 }} />
                返回
              </span> */}
              <span
                className={css`
                  line-height: 32px;
                  height: 32px !important;
                  display: inline-block;
                `}
              >
                {route.breadcrumbName}
              </span>
            </>
          ) : (
            <Link
              className={css`
                line-height: 32px;
                height: 32px !important;
                display: inline-block;
                &:hover {
                  background-color: transparent !important;
                  color: #217ba0 !important;
                }
              `}
              to={route.path}
            >
              {route.breadcrumbName}
            </Link>
          )
        }}
        menuItemRender={(itemProps, defaultDom: React.ReactNode) => {
          return (
            <div
              onClick={() => {
                navigate(itemProps.itemPath)
                setPathname(itemProps.itemPath)
              }}
            >
              {defaultDom}
            </div>
          )
        }}
        {...settings}
      >
        <PageContainer
          title={false}
          fixedHeader
          className={css`
            height: calc(100vh - 64px);
          `}
        >
          {props.content}
        </PageContainer>

        <SettingDrawer
          pathname={''}
          enableDarkTheme={false}
          getContainer={() => document.getElementById('root')}
          settings={settings}
          onSettingChange={changeSetting => setSetting({ ...settings, ...changeSetting })}
          disableUrlParams={false}
        />
      </ProLayout>
    </ProConfigProvider>
  )
}

export default Layout
