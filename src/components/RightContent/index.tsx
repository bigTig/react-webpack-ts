import { useEmotionCss } from '@ant-design/use-emotion-css'
import React from 'react'
import Avatar from './AvatarDropdown'

export type SiderTheme = 'light' | 'dark'

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

  return (
    <div className={className}>
      <Avatar />
    </div>
  )
}
export default GlobalHeaderRight
