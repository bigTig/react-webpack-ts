import { GithubOutlined } from '@ant-design/icons'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import React from 'react'
import Avatar from './AvatarDropdown'
import ToolIcon from './ToolIcon'

const TOOLICON = [{ title: 'Github 仓库', url: 'https://github.com/bigTig/react-webpack-ts.git' }]

const GlobalHeaderRight: React.FC = () => {
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
          <GithubOutlined style={{ fontSize: 22 }} onClick={() => handleWindowOpen(el.url)} />
        </ToolIcon>
      ))}

      <Avatar />
    </div>
  )
}
export default GlobalHeaderRight
