import { ConfigProvider } from 'antd'
import locale from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Router, { rootRouter } from './routers'
import { searchRoute } from './routers/utils'
import AuthRouter from './routers/utils/authRouter'
import { globalScreenWidthAtom, globalSystemConfigAtom, globalSystemTypeAtom } from './store/global'
import { currentMenuAtom } from './store/menus'

const App = () => {
  const { pathname } = useLocation()
  const globalSystemConfigState = useRecoilValue(globalSystemConfigAtom)
  const setCurrentMenuAtom = useSetRecoilState(currentMenuAtom)
  const currentMenuState = useRecoilValue(currentMenuAtom)
  const setGlobalSSystemTypeAtom = useSetRecoilState(globalSystemTypeAtom)
  const setGlobalSScreenWidthAtom = useSetRecoilState(globalScreenWidthAtom)
  const { token, header } = globalSystemConfigState.token

  /** 刷新后根据地址栏获取当前路由 */
  useEffect(() => {
    const route = searchRoute(pathname, rootRouter)
    setCurrentMenuAtom(route)
  }, [pathname, setCurrentMenuAtom])

  /** 监听窗口大小变化 */
  useEffect(() => {
    let SCREENWIDTH = window.innerWidth

    const validateInnerWidth = (width: number) => {
      if (width >= 1200) {
        setGlobalSSystemTypeAtom(0)
      }
      // 大屏iPad
      if (width < 1200 && width >= 800) {
        setGlobalSSystemTypeAtom(1)
      }
      // 小屏iPad
      if (width < 800 && width >= 415) {
        setGlobalSSystemTypeAtom(2)
      }
      // 正常手机端
      if (width < 415) {
        setGlobalSSystemTypeAtom(3)
      }

      setGlobalSScreenWidthAtom(width)
    }

    validateInnerWidth(SCREENWIDTH)

    const handleResize = () => {
      SCREENWIDTH = window.innerWidth
      console.log(SCREENWIDTH)
      validateInnerWidth(SCREENWIDTH)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setGlobalSScreenWidthAtom, setGlobalSSystemTypeAtom])

  return (
    <ConfigProvider
      locale={locale}
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
