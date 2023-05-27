import {
  AppstoreOutlined,
  DownOutlined,
  HomeOutlined,
  LoadingOutlined,
  MailOutlined,
  SettingFilled,
  SettingOutlined,
  SmileOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Mentions,
  Menu,
  MenuProps,
  Pagination,
  Popconfirm,
  Radio,
  Row,
  Space,
  Steps,
  Typography,
  Upload,
  theme,
} from 'antd'
import React from 'react'
import styles from '../../index.less'

const { useToken } = theme
const { Title, Paragraph, Text, Link } = Typography

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
]

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const MenuItems: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]

const description = 'This is a description.'

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
]

/** 组件概览 */
const Overview: React.FC = () => {
  const { token } = useToken()

  const onClick: MenuProps['onClick'] = e => {
    console.log('click ', e)
  }

  return (
    <Row gutter={[token.marginSM, token.marginSM]}>
      <Col span={24}>
        <Card title='Button' bordered={false} size='small'>
          <Space wrap>
            <Button type='primary'>Primary Button</Button>
            <Button>Default Button</Button>
            <Button type='dashed'>Dashed Button</Button>
            <Button type='text'>Text Button</Button>
            <Button type='link'>Link Button</Button>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Icon' bordered={false} size='small'>
          <Space>
            <HomeOutlined />
            <SettingFilled />
            <SmileOutlined />
            <SyncOutlined spin />
            <SmileOutlined rotate={180} />
            <LoadingOutlined />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Typography' bordered={false} size='small'>
          <Typography>
            <Title>Introduction</Title>
            <Paragraph>
              In the process of internal desktop applications development, many different design
              specs and implementations would be involved, which might cause designers and
              developers difficulties and duplication and reduce the efficiency of development.
            </Paragraph>
            <Paragraph>
              After massive project practice and summaries, Ant Design, a design language for
              background applications, is refined by Ant UED Team, which aims to{' '}
              <Text strong>
                uniform the user interface specs for internal background projects, lower the
                unnecessary cost of design differences and implementation and liberate the resources
                of design and front-end development
              </Text>
              .
            </Paragraph>
            <Title level={2}>Guidelines and Resources</Title>
            <Paragraph>
              We supply a series of design principles, practical patterns and high quality design
              resources (<Text code>Sketch</Text> and <Text code>Axure</Text>), to help people
              create their product prototypes beautifully and efficiently.
            </Paragraph>

            <Paragraph>
              <ul>
                <li>
                  <Link href='/docs/spec/proximity'>Principles</Link>
                </li>
                <li>
                  <Link href='/docs/spec/overview'>Patterns</Link>
                </li>
                <li>
                  <Link href='/docs/resources'>Resource Download</Link>
                </li>
              </ul>
            </Paragraph>
          </Typography>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Divider' bordered={false} size='small'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere
            mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
          </p>
          <Divider plain>Text</Divider>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere
            mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
          </p>
          <Divider orientation='left' plain>
            Left Text
          </Divider>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere
            mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
          </p>
          <Divider orientation='right' plain>
            Right Text
          </Divider>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere
            mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
          </p>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Grid' bordered={false} size='small'>
          <div className={styles['previewer-grid-demo']}>
            <Row style={{ marginBottom: token.marginSM }}>
              <Col span={24}>col</Col>
            </Row>
            <Row style={{ marginBottom: token.marginSM }}>
              <Col span={12}>col-12</Col>
              <Col span={12}>col-12</Col>
            </Row>
            <Row style={{ marginBottom: token.marginSM }}>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
              <Col span={8}>col-8</Col>
            </Row>
            <Row>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
              <Col span={6}>col-6</Col>
            </Row>
          </div>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Space' bordered={false} size='small'>
          <Space>
            <Button type='primary'>Button</Button>
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            <Popconfirm title='Are you sure delete this task?' okText='Yes' cancelText='No'>
              <Button>Confirm</Button>
            </Popconfirm>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Breadcrumb' bordered={false} size='small'>
          <Space>
            <Breadcrumb
              items={[
                {
                  title: 'Home',
                },
                {
                  title: <a href=''>Application Center</a>,
                },
                {
                  title: <a href=''>Application List</a>,
                },
                {
                  title: 'An Application',
                },
              ]}
            />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Dropdown' style={{ height: 250 }} bordered={false} size='small'>
          <Dropdown menu={{ items }} open>
            <a onClick={e => e.preventDefault()}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Menu' bordered={false} size='small'>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={MenuItems}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Pagination' bordered={false} size='small'>
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
          <Pagination simple defaultCurrent={2} total={50} />
          <Pagination showQuickJumper defaultCurrent={2} total={500} />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Steps' bordered={false} size='small'>
          <Steps
            current={1}
            items={[
              {
                title: 'Finished',
                description,
              },
              {
                title: 'In Progress',
                description,
                subTitle: 'Left 00:00:08',
              },
              {
                title: 'Waiting',
                description,
              },
            ]}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Cascader' style={{ height: 300 }} bordered={false} size='small'>
          <Cascader options={options} open placeholder='Please select' />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Checkbox' bordered={false} size='small'>
          <Checkbox>Checkbox</Checkbox>
          <Checkbox checked>选中态</Checkbox>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='DatePicker' style={{ height: 400 }} bordered={false} size='small'>
          <Space>
            <DatePicker placement='bottomLeft' />
            <DatePicker picker='week' placement='bottomLeft' />
            <DatePicker picker='month' placement='bottomLeft' />
            <DatePicker picker='quarter' placement='bottomLeft' />
            <DatePicker picker='year' placement='bottomLeft' />
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Form' bordered={false} size='small'>
          <Form
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete='off'
          >
            <Form.Item
              label='Username'
              name='username'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item name='remember' valuePropName='checked' wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Input' bordered={false} size='small'>
          <Input placeholder='Basic usage' />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='InputNumber' bordered={false} size='small'>
          <InputNumber min={1} max={10} defaultValue={3} />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Mentions' style={{ height: 300 }} bordered={false} size='small'>
          <Mentions
            style={{ width: '100%' }}
            defaultValue='@afc163'
            placement='bottom'
            open
            options={[
              {
                value: 'afc163',
                label: 'afc163',
              },
              {
                value: 'zombieJ',
                label: 'zombieJ',
              },
              {
                value: 'yesmeck',
                label: 'yesmeck',
              },
            ]}
          />
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Radio' bordered={false} size='small'>
          <Space>
            <Radio>Radio</Radio>
            <Radio.Group defaultValue='a' buttonStyle='solid'>
              <Radio.Button value='a'>Hangzhou</Radio.Button>
              <Radio.Button value='b'>Shanghai</Radio.Button>
              <Radio.Button value='c'>Beijing</Radio.Button>
              <Radio.Button value='d'>Chengdu</Radio.Button>
            </Radio.Group>
            <Radio.Group defaultValue='c' buttonStyle='solid'>
              <Radio.Button value='a'>Hangzhou</Radio.Button>
              <Radio.Button value='b' disabled>
                Shanghai
              </Radio.Button>
              <Radio.Button value='c'>Beijing</Radio.Button>
              <Radio.Button value='d'>Chengdu</Radio.Button>
            </Radio.Group>
          </Space>
        </Card>
      </Col>
      <Col span={24}>
        <Card title='Menu' bordered={false} size='small'>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={MenuItems}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default Overview
