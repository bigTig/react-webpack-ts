import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Tooltip } from 'antd'
import React from 'react'

/** 工具 - icon */
const ToolIcon: React.FC<{
  children: React.ReactNode
  title: string
}> = props => {
  const toolClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    }
  })

  return (
    <div className={toolClassName}>
      <Tooltip title={props.title}>{props.children}</Tooltip>
    </div>
  )
}

export default ToolIcon
