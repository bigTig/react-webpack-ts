import React from 'react'
import styles from './index.less'

/**
 * logo 和 标题
 * @returns
 */
const LogoBasic: React.FC = () => {
  return (
    <div className={styles['basic-layout-header-logo']}>
      <img
        className={styles['basic-layout-logo-url']}
        src='https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg'
        alt=''
      />
      <span className={styles['basic-layout-logo-title']}>阿峰管理系统</span>
    </div>
  )
}

export default LogoBasic
