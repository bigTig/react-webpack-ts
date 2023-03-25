import { ConfigProvider } from 'antd'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Router from './routers'
import { systemConfigAtom, systemTypeAtom } from './store/config'
import { screenWidthAtom } from './store/menus'
import { validateIsMobile } from './utils/validate'

const App = () => {
  const systemConfigState = useRecoilValue(systemConfigAtom)
  const setSystemTypeAtom = useSetRecoilState(systemTypeAtom)
  const setScreenWidthAtom = useSetRecoilState(screenWidthAtom)
  const { token, header } = systemConfigState.token

  useEffect(() => {
    setSystemTypeAtom(validateIsMobile() ? 1 : 0)
  }, [setSystemTypeAtom])

  /** 监听窗口大小变化 */
  useEffect(() => {
    window.onresize = () => {
      return (() => {
        const SCREENWIDTH = document.body.clientWidth
        if (SCREENWIDTH >= 1200) {
          setSystemTypeAtom(0)
        }
        if (SCREENWIDTH < 1200 && SCREENWIDTH >= 800) {
          setSystemTypeAtom(1)
        }
        if (SCREENWIDTH >= 375 && SCREENWIDTH < 800) {
          setSystemTypeAtom(2)
        }
        setScreenWidthAtom(SCREENWIDTH)
      })()
    }
  }, [setScreenWidthAtom, setSystemTypeAtom])

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
