import defaultProps from '@/config/defaultProps'
import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './index.less'

/**
 * logo 和 标题
 * @returns
 */
const LogoBasic: React.FC = () => {
  return (
    <NavLink to={defaultProps.location.pathname}>
      <div className={styles['basic-layout-header-logo']}>
        <img className={styles['basic-layout-logo-url']} src={defaultProps.logo} alt='' />
        <span className={styles['basic-layout-logo-title']}>{defaultProps.title}</span>
      </div>
    </NavLink>
  )
}

export default LogoBasic
