import React from 'react'
import styles from './index.less'

import '@/icon'

interface SvgIconProps {
  name: string
  width?: string | number
  height?: string | number
}

/**
 * @description: SvgIcon
 * @author: KaifengLi
 * @version: 1.0.0
 * @Date: 2024-06-26 13:43:13
 */
const SvgIcon = (props: SvgIconProps) => {
  const { width = 30, height = 30, name } = props

  return (
    <svg className={styles['svg-icon']} style={{ width: width, height: height }}>
      <use xlinkHref={'#' + name}></use>
    </svg>
  )
}

export default SvgIcon
