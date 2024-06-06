import React from 'react'
import styles from './index.less'

const LOGINBGM = require('@/assets/images/common/login_bgm.mp4')

const Home: React.FC = () => {
  return (
    <div className={styles['home-container']}>
      <video className={styles['home-bgm']} src={LOGINBGM} autoPlay loop preload='' muted></video>
    </div>
  )
}

export default Home
