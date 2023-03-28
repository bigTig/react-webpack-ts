import { globalScreenWidthAtom, globalSystemConfigAtom } from '@/store/global'
import { theme } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styles from './index.less'

const { useToken } = theme

/**
 * logo 和 标题
 * @returns
 */
const LogoBasic: React.FC = () => {
  const { token: tokens } = useToken()
  const globalSystemConfigState = useRecoilValue(globalSystemConfigAtom)
  const globalScreenWidthState = useRecoilValue(globalScreenWidthAtom)
  const { location, logo, title, token, navTheme, siderWidth } = globalSystemConfigState

  return (
    <NavLink to={location.pathname}>
      <div
        className={styles['basic-layout-header-logo']}
        style={{ width: globalScreenWidthState < 900 ? 92 : siderWidth + 12 }}
      >
        <img className={styles['basic-layout-logo-url']} src={logo} alt='' />
        <span
          className={styles['basic-layout-logo-title']}
          style={{
            color: navTheme === 'light' ? token.token?.colorPrimary : tokens.colorWhite,
            display: globalScreenWidthState < 900 ? 'none' : 'block',
          }}
        >
          {title}
        </span>
      </div>
    </NavLink>
  )
}

export default LogoBasic
