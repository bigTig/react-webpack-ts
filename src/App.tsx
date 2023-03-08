import { ConfigProvider } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Router from './routers'
import { systemConfigAtom } from './store/config'

const App = () => {
  const systemConfigState = useRecoilValue(systemConfigAtom)
  const { token, header } = systemConfigState.token

  return (
    <ConfigProvider
      theme={{
        token: token,
        components: {
          Layout: {
            colorBgHeader: header?.colorBgHeader,
          },
        },
      }}
    >
      <Router />
    </ConfigProvider>
  )
}

export default App
