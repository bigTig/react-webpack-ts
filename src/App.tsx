/* eslint-disable react/prop-types */
import type { ProSettings } from '@ant-design/pro-components'
import {
  PageContainer,
  ProCard,
  ProConfigProvider,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components'
import React, { useState } from 'react'
import RightContent from './components/RightContent'
import defaultProps from './config/defaultProps'

const App = () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  })

  const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1')

  return (
    <div
      id='test-pro-layout'
      style={{
        height: '100vh',
      }}
    >
      <ProConfigProvider hashed={false}>
        <ProLayout
          prefixCls='my-prefix'
          {...defaultProps}
          location={{
            pathname,
          }}
          siderMenuType='sub'
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
            console.log(_)
            if (_.isMobile) return defaultDom
            return <>{defaultDom}</>
          }}
          menuFooterRender={undefined}
          onMenuHeaderClick={e => console.log(e)}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                setPathname(item.path || '/welcome')
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          <PageContainer
            token={{
              paddingInlinePageContainerContent: 40,
            }}
            subTitle='简单的描述'
          >
            <ProCard
              style={{
                height: '200vh',
                minHeight: 800,
              }}
            >
              <div />
            </ProCard>
          </PageContainer>

          <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById('test-pro-layout')}
            settings={settings}
            onSettingChange={changeSetting => {
              setSetting(changeSetting)
            }}
            disableUrlParams={false}
          />
        </ProLayout>
      </ProConfigProvider>
    </div>
  )
}

export default App
