import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import classNames from 'classnames'
import React from 'react'
import styles from './index.less'

const { useToken } = theme

export type TrendProps = {
  colorful?: boolean
  flag: 'up' | 'down'
  style?: React.CSSProperties
  reverseColor?: boolean
  className?: string
  children?: React.ReactNode
}

const Trend: React.FC<TrendProps> = ({
  colorful = true,
  reverseColor = false,
  flag,
  children,
  className,
  ...rest
}) => {
  const { token } = useToken()

  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className,
  )

  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && (
        <span className={styles[flag]}>
          {flag === 'up' ? (
            <CaretUpOutlined
              style={{ color: token.colorError, fontSize: token.fontSizeSM, marginLeft: 5 }}
            />
          ) : (
            <CaretDownOutlined
              style={{ color: token.colorSuccess, fontSize: token.fontSizeSM, marginLeft: 5 }}
            />
          )}
        </span>
      )}
    </div>
  )
}

export default Trend
