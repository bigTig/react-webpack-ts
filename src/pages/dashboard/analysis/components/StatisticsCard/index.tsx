import { ExclamationCircleOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import React from 'react'
import styles from './index.less'

const { useToken } = theme

type StatisticsCardProps = {
  label?: string
  children?: React.ReactNode
  footer?: React.ReactNode
}

/** 统计卡片 */
const StatisticsCard: React.FC<StatisticsCardProps> = props => {
  const { token } = useToken()
  const { label, children, footer } = props

  return (
    <div className={styles['statistics-card']}>
      <div className={styles['statistics-header']}>
        <span style={{ color: token.colorTextLabel }}>{label}</span>
        <ExclamationCircleOutlined />
      </div>
      <div className={styles['statistics-contanier']}>{children}</div>
      <div className={styles['statistics-footer']}>{footer}</div>
    </div>
  )
}

export default StatisticsCard
