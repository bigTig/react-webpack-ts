/* eslint-disable @typescript-eslint/no-explicit-any */
import { globalTokenAtom } from '@/store/global'
import { useEmotionCss } from '@ant-design/use-emotion-css'
import { Button, Checkbox, Form, Input, InputRef, Space, theme } from 'antd'
import { FormInstance, useForm } from 'antd/es/form/Form'
import classNames from 'classnames'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import styles from './index.less'

const { useToken } = theme

/** 账号密码登录 */
const AccountForm: React.FC = () => {
  const { token } = useToken()
  const navigate = useNavigate()
  const usenameRef = useRef<InputRef>(null)
  const [loginForm] = useForm<FormInstance>()
  const setGlobalTokenAtom = useSetRecoilState(globalTokenAtom)
  const passwordRef = useRef<InputRef>(null)
  const [activeType, setActiveType] = useState('')

  const placeholderClassName = useEmotionCss(({ token }) => {
    return {
      [`&::after`]: {
        color: token.colorTextQuaternary,
      },
    }
  })

  const handleOnFinish = async (values: any) => {
    console.log('Success:', values)
    try {
      navigate('/dashboard/dataVisualize')
      setGlobalTokenAtom('token')
    } catch (err) {
      console.log(err)
    }
  }

  const handleOnFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name='normal_login'
      className={styles['login-form']}
      initialValues={{ remember: true }}
      size='large'
      autoComplete='off'
      form={loginForm}
      onFinish={handleOnFinish}
      onFinishFailed={handleOnFinishFailed}
    >
      <Form.Item>
        <Form.Item
          name='username'
          noStyle
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            ref={usenameRef}
            onBlur={() => setActiveType('')}
            onFocus={() => setActiveType('Username')}
          />
        </Form.Item>
        <span
          className={classNames(
            placeholderClassName,
            styles['placeholder-label'],
            activeType === 'Username' || loginForm?.getFieldValue('username')
              ? styles['placeholder-focus']
              : '',
          )}
          data-placeholder='Username'
          onClick={() => {
            console.log()
            usenameRef.current?.focus()
            setActiveType('Username')
          }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item
          name='password'
          noStyle
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            ref={passwordRef}
            type='password'
            onBlur={() => setActiveType('')}
            onFocus={() => setActiveType('Password')}
          />
        </Form.Item>
        <span
          className={classNames(
            placeholderClassName,
            styles['placeholder-label'],
            activeType === 'Password' || loginForm?.getFieldValue('password')
              ? styles['placeholder-focus']
              : '',
          )}
          data-placeholder='Password'
          onClick={() => {
            passwordRef.current?.focus()
            setActiveType('Password')
          }}
        />
      </Form.Item>
      <Form.Item className={styles['ant-form-item-none-margin']}>
        <Space>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className={styles['login-form-forgot']} style={{ color: token.colorPrimary }}>
            Forgot password
          </a>
        </Space>
      </Form.Item>

      <Form.Item
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
      >
        <Checkbox>
          I have read the <a href=''>agreement</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' block htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AccountForm
