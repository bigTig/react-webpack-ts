import { Progress, TinyArea, TinyColumn } from '@ant-design/charts'
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons'
import { Col, Row, theme } from 'antd'
import React, { useState } from 'react'
import StatisticsCard from '../StatisticsCard'

const { useToken } = theme

/** 增长率 */
const IntroduceRow: React.FC = () => {
  const { token } = useToken()
  const [data] = useState([2, 3, 5, 6, 7, 39, 23, 12, 34])

  return (
    <Row gutter={12}>
      <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
        <StatisticsCard
          label='总销售额'
          footer={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 5 }}>日销售额</span>
              <span>￥12,423</span>
            </div>
          }
        >
          <div style={{ fontSize: token.fontSizeHeading3, paddingBottom: 5 }}>¥ 126,560</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 16 }}>
              <span style={{ marginRight: 5 }}>周同比</span>
              <span style={{ marginRight: 5 }}>12%</span>
              <CaretUpOutlined style={{ color: token.colorError }} />
            </div>
            <div>
              <span style={{ marginRight: 5 }}>日同比</span>
              <span style={{ marginRight: 5 }}>11%</span>
              <CaretDownOutlined style={{ color: token.colorSuccess }} />
            </div>
          </div>
        </StatisticsCard>
      </Col>
      <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
        <StatisticsCard
          label='访问量'
          footer={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 5 }}>日访问量</span>
              <span>1,423</span>
            </div>
          }
        >
          <div style={{ fontSize: token.fontSizeHeading3, paddingBottom: 5 }}>8,846</div>
          <TinyArea height={36} smooth data={data} />
        </StatisticsCard>
      </Col>
      <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
        <StatisticsCard
          label='支付笔数'
          footer={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 5 }}>转化率</span>
              <span>60%</span>
            </div>
          }
        >
          <div style={{ fontSize: token.fontSizeHeading3, paddingBottom: 5 }}>6,846</div>
          <TinyColumn data={data} />
        </StatisticsCard>
      </Col>
      <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={24}>
        <StatisticsCard
          label='运营活动效果'
          footer={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: 16 }}>
                <span style={{ marginRight: 5 }}>周同比</span>
                <span style={{ marginRight: 5 }}>12%</span>
                <CaretUpOutlined style={{ color: token.colorError }} />
              </div>
              <div>
                <span style={{ marginRight: 5 }}>日同比</span>
                <span style={{ marginRight: 5 }}>11%</span>
                <CaretDownOutlined style={{ color: token.colorSuccess }} />
              </div>
            </div>
          }
        >
          <div style={{ fontSize: token.fontSizeHeading3, paddingBottom: 5 }}>78%</div>
          <Progress height={10} percent={0.78} barWidthRatio={0.2} color='#13C2C2' />
        </StatisticsCard>
      </Col>
    </Row>
  )
}

export default IntroduceRow
