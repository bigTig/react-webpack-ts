import { Col, Row } from 'antd'
import type { RadioChangeEvent } from 'antd/es/radio'
import React, { useState } from 'react'
import ProportionSales from '../ProportionSales'
import TopSearch from '../TopSearch'

type SalesType = 'all' | 'online' | 'stores'

const SearchData = new Array(100).fill(1).map((el, index) => {
  return {
    count: Math.floor(Math.random() * (20 - 10) + 10) * 10,
    index: index + 1,
    keyword: `搜索关键词-${index}`,
    range: Math.floor(Math.random() * (20 - 10) + 10) * 10,
    status: Math.round(Math.random()),
  }
})

const SalesPieData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 },
  { x: '个护健康', y: 3113 },
]

/** 热门搜索 */
const SalesHot: React.FC = () => {
  const [salesType, setSalesType] = useState<SalesType>('all')

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value)
  }

  return (
    <Row gutter={24}>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <TopSearch visitData2={[9, 4, 6, 7, 8, 1, 4]} searchData={SearchData} />
      </Col>
      <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ paddingLeft: 0 }}>
        <ProportionSales
          salesType={salesType}
          salesPieData={SalesPieData}
          handleChangeSalesType={handleChangeSalesType}
        />
      </Col>
    </Row>
  )
}

export default SalesHot
