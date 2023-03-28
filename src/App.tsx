import { ConfigProvider } from 'antd'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Router from './routers'
import AuthRouter from './routers/utils/authRouter'
import { globalScreenWidthAtom, globalSystemConfigAtom, globalSystemTypeAtom } from './store/global'
import { validateIsMobile } from './utils/validate'

const App = () => {
  const globalSystemConfigState = useRecoilValue(globalSystemConfigAtom)
  const setGlobalSSystemTypeAtom = useSetRecoilState(globalSystemTypeAtom)
  const setGlobalSScreenWidthAtom = useSetRecoilState(globalScreenWidthAtom)
  const { token, header } = globalSystemConfigState.token

  useEffect(() => {
    setGlobalSSystemTypeAtom(validateIsMobile() ? 1 : 0)
  }, [setGlobalSSystemTypeAtom])

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
    <>
      <Helmet>
        <title>{globalSystemConfigState.title}</title>
      </Helmet>
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
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </>
  )
}

export default App
