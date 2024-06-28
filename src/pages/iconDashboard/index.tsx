/* eslint-disable @typescript-eslint/no-explicit-any */
import SvgIcon from '@/components/SvgIcon'
import icon from '@/icon'
import { SmileFilled, SmileOutlined } from '@ant-design/icons'
import { Divider, Typography } from 'antd'
import React from 'react'
import styles from './index.less'
const { Paragraph } = Typography

import IconBusinessTrip from '@/svg/icon-business-trip.svg'

/**
 * @description: svg图标展示面板
 * @author: KaifengLi
 * @version: v1.0.0
 * @Date: 2024-06-26 14:51:31
 */
const IconDashboard: React.FC = () => {
  return (
    <div className={styles['icon-dashboard']}>
      <div>
        <Divider>用@svgr/webpack转svg为Component</Divider>
        <IconBusinessTrip fill='currentColor' height={100} width={100} />
      </div>
      <Divider>用svg-sprite-loader,svgo-loader</Divider>
      <div className={styles.dashboard}>
        {icon.map((el: any) => (
          <div className={styles.icon} key={el.default.id}>
            <SvgIcon name={el.default.id} height={100} width={100} />
            <Paragraph
              ellipsis
              copyable={{
                icon: [<SmileOutlined key='copy-icon' />, <SmileFilled key='copied-icon' />],
                tooltips: ['点击复制', '复制成功!!'],
              }}
            >
              {el.default.id}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IconDashboard
