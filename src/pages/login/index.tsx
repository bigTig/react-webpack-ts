import { theme } from 'antd'
import React from 'react'
import AccountForm from './components/AccountForm'
import styles from './index.less'

const { useToken } = theme

const Login: React.FC = () => {
  const { token } = useToken()
  return (
    <div className={styles['login-container']}>
      <div className={styles.container}>
        <div className={styles['left-container']} />
        <div className={styles['right-container']}>
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
