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
    const padding = ['110px 75px 100px', '110px 48px 100px', '110px 24px 100px', '110px 24px 100px']
    return {
      padding: padding[globalSystemTypeState],
    }
  })

  const containerClassName = useEmotionCss(() => {
    const margin = ['', '0 75px', '0 45px', '0 16px']
    const height = ['688px', '688px', '688px', '600px']
    return {
      margin: margin[globalSystemTypeState],
      height: height[globalSystemTypeState],
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
        {globalSystemTypeState === 0 ? (
          <div className={styles['left-container']}>
            <a href='https://github.com/bigTig' target='_blank' rel='noreferrer'>
              <div className={styles['left-logo']}>
                <div className={styles.title}>程序猿阿峰·管理平台</div>
                <div className={styles.tip}>与科技同行，与用户更近，欢迎 Star⭐</div>
              </div>
            </a>
          </div>
        ) : null}
        <div className={classNames(styles['right-container'], rightClassName)}>
          <a href='https://github.com/bigTig' target='_blank' rel='noreferrer'>
            <div className={styles.logo} />
          </a>
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
