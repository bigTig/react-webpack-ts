import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Dropdown } from 'antd'
import type { DropDownProps } from 'antd/es/dropdown'
import classNames from 'classnames'
import React from 'react'

export type HeaderDropdownProps = {
  overlayClassName?: string
  placement?:
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight'
    | 'top'
    | 'bottom'
} & Omit<DropDownProps, 'overlay'>

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const className = useEmotionCss(({ token }) => {
    return {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%',
      },
    }
  })
  return (
    <Dropdown
      overlayClassName={classNames(className, cls)}
      getPopupContainer={target => target.parentElement || document.body}
      {...restProps}
    />
  )
}

export default HeaderDropdown
