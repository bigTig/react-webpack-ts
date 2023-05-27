import { Button, Card, Col, Collapse, DrawerProps, Row, Space, Tabs, TabsProps, theme } from 'antd'
import React from 'react'
import Overview from './components/Overview'
import styles from './index.less'

const { Panel } = Collapse

const { useToken } = theme

/** 主题编辑器 */
const ThemeEditor: React.FC<DrawerProps> = () => {
  const { token } = useToken()

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `颜色`,
      children: (
        <Collapse accordion style={{ backgroundColor: 'transparent' }} bordered={false}>
          <Panel style={{ border: 'none' }} showArrow header='品牌色' key='1'>
            <p>
              品牌色是体现产品特性和传播理念最直观的视觉元素之一。在你完成品牌主色的选取之后，我们会自动帮你生成一套完整的色板，并赋予它们有效的设计语义。
            </p>
          </Panel>
          <Panel style={{ border: 'none' }} header='成功色' key='2'>
            <p>1222</p>
          </Panel>
          <Panel style={{ border: 'none' }} header='警戒色' key='3'>
            <p>1222</p>
          </Panel>
          <Panel style={{ border: 'none' }} header='错误色' key='4'>
            <p>1222</p>
          </Panel>
          <Panel style={{ border: 'none' }} header='信息色' key='5'>
            <p>1222</p>
          </Panel>
          <Panel style={{ border: 'none' }} header='中性色' key='6'>
            <p>1222</p>
          </Panel>
        </Collapse>
      ),
    },
    {
      key: '2',
      label: `尺寸`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `风格`,
      children: `Content of Tab Pane 3`,
    },
    {
      key: '3',
      label: `其他`,
      children: `Content of Tab Pane 3`,
    },
  ]

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className={styles['theme-container']}>
      <Row
        gutter={[token.marginSM, token.marginSM]}
        style={{ height: '100%', marginBottom: token.marginSM, overflowY: 'hidden' }}
      >
        <Col xs={24} sm={24} md={10} lg={10} xl={8}>
          <Card bordered={false} size='small' style={{ height: '100%' }}>
            <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={16} style={{ height: '100%', overflowY: 'auto' }}>
          <Overview />
        </Col>
      </Row>
      <Row gutter={[token.marginSM, token.marginSM]}>
        <Col span={24}>
          <Card bordered={false} size='small'>
            <Space size={token.marginSM} style={{ float: 'right' }}>
              <Button>导出</Button>
              <Button type='primary'>保存</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default ThemeEditor
