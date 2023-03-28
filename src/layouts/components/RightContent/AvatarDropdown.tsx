import { globalSystemConfigAtom } from '@/store/global'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Avatar } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import HeaderDropdown from '../HeaderDropdown'

export type GlobalHeaderRightProps = {
  menu?: boolean
}

const Name = () => {
  const globalSystemConfigState = useRecoilValue(globalSystemConfigAtom)

  const nameClassName = useEmotionCss(({ token }) => {
    return {
      width: 'auto',
      maxWidth: '70px',
      height: '48px',
      overflow: 'hidden',
      lineHeight: '48px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      color: globalSystemConfigState.navTheme === 'light' ? token.colorPrimary : token.colorWhite,
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        display: 'none',
      },
    }
  })

  return <span className={`${nameClassName} anticon`}>用户名</span>
}

const AvatarLogo = () => {
  const avatarClassName = useEmotionCss(({ token }) => {
    return {
      marginRight: '8px',
      color: token.colorPrimary,
      verticalAlign: 'top',
      [`@media only screen and (max-width: ${token.screenMD}px)`]: {
        margin: 0,
      },
    }
  })

  return (
    <Avatar
      size='small'
      className={avatarClassName}
      src='https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'
      alt='avatar'
    />
  )
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const navigate = useNavigate()

  /**
   * 退出登录，并且将当前的 url 保存
   */

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    }
  })

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        navigate('/login')
      },
    },
  ]

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        items: menuItems,
      }}
    >
      <span className={actionClassName}>
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  )
}

export default AvatarDropdown
