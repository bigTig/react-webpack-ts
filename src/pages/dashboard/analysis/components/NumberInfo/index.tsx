import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import classNames from 'classnames'
import React from 'react'
import styles from './index.less'

const { useToken } = theme

export type NumberInfoProps = {
  title?: React.ReactNode | string
  subTitle?: React.ReactNode | string
  total?: React.ReactNode | string
  status?: 'up' | 'down'
  theme?: string
  gap?: number
  subTotal?: number
  suffix?: string
  style?: React.CSSProperties
}

const NumberInfo: React.FC<NumberInfoProps> = ({
  theme,
  title,
  subTitle,
  total,
  subTotal,
  status,
  suffix,
  gap,
  ...rest
}) => {
  const { token } = useToken()

  return (
    <div
      className={classNames(styles['number-info'], {
        [styles[`numberInfo${theme}`]]: theme,
      })}
      {...rest}
    >
      {title && (
        <div className={styles['number-info-title']} title={typeof title === 'string' ? title : ''}>
          {title}
        </div>
      )}
      {subTitle && (
        <div
          className={styles['number-info-sub-title']}
          title={typeof subTitle === 'string' ? subTitle : ''}
        >
          {subTitle}
        </div>
      )}
      <div
        className={styles['number-info-value']}
        style={gap ? { marginTop: gap, paddingBottom: gap } : {}}
      >
        <span>
          {total}
          {suffix && <em className={styles.suffix}>{suffix}</em>}
        </span>
        {(status || subTotal) && (
          <span
            className={styles['sub-total']}
            style={{ fontSize: token.fontSizeLG, color: token.colorTextTertiary }}
          >
            {subTotal}
            {status && status === 'up' ? (
              <CaretUpOutlined
                style={{ color: token.colorError, fontSize: token.fontSizeLG, marginLeft: 5 }}
              />
            ) : (
              <CaretDownOutlined
                style={{ color: token.colorSuccess, fontSize: token.fontSizeLG, marginLeft: 5 }}
              />
            )}
          </span>
        )}
      </div>
    </div>
  )
}

export default NumberInfo
