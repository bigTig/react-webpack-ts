import { globalSystemConfigAtom } from '@/store/global'
import { GithubOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { theme } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import Avatar from './AvatarDropdown'
import ToolIcon from './ToolIcon'

const { useToken } = theme

const TOOLICON = [{ title: 'Github 仓库', url: 'https://github.com/bigTig/react-webpack-ts.git' }]

const GlobalHeaderRight: React.FC = () => {
  const token = useToken()
  const globalSystemConfigState = useRecoilValue(globalSystemConfigAtom)

  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8,
    }
  })

  const handleWindowOpen = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className={className}>
      {TOOLICON.map(el => (
        <ToolIcon title={el.title} key={el.title}>
          <GithubOutlined
            style={{
              fontSize: 22,
              color:
                globalSystemConfigState.navTheme === 'light'
                  ? token.token.colorPrimary
                  : token.token.colorWhite,
            }}
            onClick={() => handleWindowOpen(el.url)}
          />
        </ToolIcon>
      ))}

      <Avatar />
    </div>
  )
}
export default GlobalHeaderRight
