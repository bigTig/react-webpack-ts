import { systemConfigAtom } from '@/store/config'
import { screenWidthAtom } from '@/store/menus'
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
  const screenWidthState = useRecoilValue(screenWidthAtom)
  const { location, logo, title, token, siderWidth } = systemConfigState

  return (
    <NavLink to={location.pathname}>
      <div
        className={styles['basic-layout-header-logo']}
        style={{ width: screenWidthState < 900 ? 92 : siderWidth + 12 }}
      >
        <img className={styles['basic-layout-logo-url']} src={logo} alt='' />
        <span
          className={styles['basic-layout-logo-title']}
          style={{
            color: token.header.colorHeaderTitle,
            display: screenWidthState < 900 ? 'none' : 'block',
          }}
        >
          {title}
        </span>
      </div>
    </NavLink>
  )
}

export default LogoBasic
