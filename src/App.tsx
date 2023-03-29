import { ConfigProvider } from 'antd'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Router, { rootRouter } from './routers'
import { searchRoute } from './routers/utils'
import AuthRouter from './routers/utils/authRouter'
import { globalScreenWidthAtom, globalSystemConfigAtom, globalSystemTypeAtom } from './store/global'
import { currentMenuAtom } from './store/menus'
import { validateIsMobile } from './utils/validate'

const App = () => {
  const { pathname } = useLocation()
  const globalSystemConfigState = useRecoilValue(globalSystemConfigAtom)
  const setCurrentMenuAtom = useSetRecoilState(currentMenuAtom)
  const currentMenuState = useRecoilValue(currentMenuAtom)
  const setGlobalSSystemTypeAtom = useSetRecoilState(globalSystemTypeAtom)
  const setGlobalSScreenWidthAtom = useSetRecoilState(globalScreenWidthAtom)
  const { token, header } = globalSystemConfigState.token

  useEffect(() => {
    setGlobalSSystemTypeAtom(validateIsMobile() ? 1 : 0)
  }, [setGlobalSSystemTypeAtom])

  /** 刷新后根据地址栏获取当前路由 */
  useEffect(() => {
    const route = searchRoute(pathname, rootRouter)
    setCurrentMenuAtom(route)
  }, [pathname, setCurrentMenuAtom])

  /** 监听窗口大小变化 */
  useEffect(() => {
    window.onresize = () => {
      return (() => {
        const SCREENWIDTH = document.body.clientWidth
        if (SCREENWIDTH >= 1200) {
          setGlobalSSystemTypeAtom(0)
        }
        if (SCREENWIDTH < 1200 && SCREENWIDTH >= 800) {
          setGlobalSSystemTypeAtom(1)
        }
        if (SCREENWIDTH >= 375 && SCREENWIDTH < 800) {
          setGlobalSSystemTypeAtom(2)
        }
        setGlobalSScreenWidthAtom(SCREENWIDTH)
      })()
    }
  }, [setGlobalSScreenWidthAtom, setGlobalSSystemTypeAtom])

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
      <Helmet>
        <title>
          {currentMenuState?.meta?.title || ''} - {globalSystemConfigState?.title}
        </title>
      </Helmet>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </ConfigProvider>
  )
}

export default App
