import { systemConfigAtom } from '@/store/config'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styles from './index.less'

/**
 * logo 和 标题
 * @returns
 */
const LogoBasic: React.FC = () => {
  const systemConfigState = useRecoilValue(systemConfigAtom)
  const { location, logo, title, token } = systemConfigState

  return (
    <NavLink to={location.pathname}>
      <div className={styles['basic-layout-header-logo']}>
        <img className={styles['basic-layout-logo-url']} src={logo} alt='' />
        <span
          className={styles['basic-layout-logo-title']}
          style={{
            color: token.header.colorHeaderTitle,
          }}
        >
          {title}
        </span>
      </div>
    </NavLink>
  )
}

export default LogoBasic
