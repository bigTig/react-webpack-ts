/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from '@ant-design/charts'
import { Card, Radio, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd/es/radio'
import numeral from 'numeral'
import React from 'react'

const { Text } = Typography

const ProportionSales = ({
  salesType,
  salesPieData,
  handleChangeSalesType,
}: {
  salesType: 'all' | 'online' | 'stores'
  salesPieData: any[]
  handleChangeSalesType?: (e: RadioChangeEvent) => void
}) => (
  <Card
    bordered={false}
    title='销售额类别占比'
    style={{
      height: '100%',
    }}
    extra={
      <div>
        <Radio.Group value={salesType} onChange={handleChangeSalesType}>
          <Radio.Button value='all'>全部渠道</Radio.Button>
          <Radio.Button value='online'>线上</Radio.Button>
          <Radio.Button value='stores'>门店</Radio.Button>
        </Radio.Group>
      </div>
    }
  >
    <div>
      <Text>销售额</Text>
      <Pie
        angleField='y'
        colorField='x'
        appendPadding={10}
        innerRadius={0.6}
        radius={0.8}
        data={salesPieData as any}
        interactions={[
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
        ]}
        label={{
          formatter: (text, item) => {
            // eslint-disable-next-line no-underscore-dangle
            return `${item._origin.x}: ${numeral(item._origin.y).format('0,0')}`
          },
        }}
        legend={{
          layout: 'horizontal',
          position: 'bottom',
        }}
        statistic={{
          title: {
            content: '销售额',
          },
          content: {
            style: {
              whiteSpace: 'pre-wrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          },
        }}
      />
    </div>
  </Card>
)

export default ProportionSales
