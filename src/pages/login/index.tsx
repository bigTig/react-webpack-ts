import { globalSystemTypeAtom } from '@/store/global'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { theme } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { useRecoilValue } from 'recoil'
import AccountForm from './components/AccountForm'
import styles from './index.less'

const BGURL = require('@/assets/images/common/login_bg.png')

const { useToken } = theme

const Login: React.FC = () => {
  const { token } = useToken()
  const globalSystemTypeState = useRecoilValue(globalSystemTypeAtom)

  const rightClassName = useEmotionCss(() => {
    const padding = ['110px 75px 100px', '110px 48px 100px', '110px 24px 100px']
    return {
      padding: padding[globalSystemTypeState],
    }
  })

  const containerClassName = useEmotionCss(() => {
    const margin = ['', '0 75px', '0 16px']
    return {
      margin: margin[globalSystemTypeState],
    }
  })

  return (
    <div
      className={styles['login-container']}
      style={{
        backgroundImage: globalSystemTypeState === 1 ? 'none' : `url(${BGURL})`,
      }}
    >
      <div className={classNames(styles.container, containerClassName)}>
        {globalSystemTypeState === 0 ? <div className={styles['left-container']} /> : null}
        <div className={classNames(styles['right-container'], rightClassName)}>
          <div className={styles.logo} />
          <div className={styles['logo-tip']} style={{ color: token.colorPrimary }}>
            Welcome back
          </div>
          <div className={styles['logo-desc']} style={{ color: token.colorTextQuaternary }}>
            Sign in to continue
          </div>
          <AccountForm />
        </div>
      </div>
    </div>
  )
}

export default Login
