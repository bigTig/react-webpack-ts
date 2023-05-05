import { Column } from '@ant-design/charts'
import { Col, DatePicker, Row, Space, Tabs } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker/generatePicker'
import type { Dayjs } from 'dayjs'
import numeral from 'numeral'
import React from 'react'
import styles from './index.less'

const { RangePicker } = DatePicker

type RangePickerValue = RangePickerProps<Dayjs>['value']
export type TimeType = 'today' | 'week' | 'month' | 'year'

const rankingListData: { title: string; total: number }[] = []
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  })
}

/** 销售卡片 */
const SalesCard = ({
  rangePickerValue,
  salesData,
  isActive,
  handleRangePickerChange,
  selectDate,
}: {
  rangePickerValue: RangePickerValue
  isActive: (key: TimeType) => string
  salesData: { x: string; y: number }[]
  handleRangePickerChange: (values: RangePickerValue, formatString: [string, string]) => void
  selectDate: (key: TimeType) => void
}) => {
  const TabItems = [
    {
      label: '销售额',
      key: '1',
      children: (
        <div className={styles['sales-bar']}>
          <Row>
            <Col xxl={16} xl={16} lg={16} md={12} sm={12} xs={24}>
              <Column
                height={300}
                data={salesData}
                xField='x'
                yField='y'
                yAxis={{
                  grid: null,
                }}
                meta={{
                  y: {
                    type: 'linear',
                    alias: '销售量',
                    min: 0,
                    range: [0, 1],
                  },
                }}
              />
            </Col>
            <Col xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
              <div className={styles['sales-rank']}>
                <h4 className={styles['ranking-title']}>门店销售额排名</h4>
                <ul className={styles['ranking-list']}>
                  {rankingListData.map((item, i) => (
                    <li key={item.title}>
                      <span
                        className={`${styles['ranking-item-number']} ${i < 3 ? styles.active : ''}`}
                      >
                        {i + 1}
                      </span>
                      <span className={styles['ranking-item-title']} title={item.title}>
                        {item.title}
                      </span>
                      <span className={styles['ranking-item-value']}>
                        {numeral(item.total).format('0,0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    { label: '访问量', key: '2' },
  ]

  return (
    <div className={styles['sales-card']}>
      <Tabs
        tabBarExtraContent={
          <>
            <Space className={styles['sales-extra']} size={20}>
              <a className={isActive('today')} onClick={() => selectDate('today')}>
                今日
              </a>
              <a className={isActive('week')} onClick={() => selectDate('week')}>
                本周
              </a>
              <a className={isActive('month')} onClick={() => selectDate('month')}>
                本月
              </a>
              <a className={isActive('year')} onClick={() => selectDate('year')}>
                本年
              </a>
              <RangePicker
                value={rangePickerValue}
                onChange={handleRangePickerChange}
                style={{ width: 256 }}
              />
            </Space>
          </>
        }
        items={TabItems}
      />
    </div>
  )
}

export default SalesCard
