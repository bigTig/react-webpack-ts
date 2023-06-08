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

  const placeholderActiveClassName = useEmotionCss(({ token }) => {
    return {
      [`&::after`]: {
        color: token.colorPrimary,
      },
    }
  })

  const handleOnFinish = async (values: any) => {
    console.log('Success:', values)
    try {
      navigate('/')
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
        <Form.Item name='username' noStyle rules={[{ required: true, message: '请输入用户名' }]}>
          <Input
            ref={usenameRef}
            onBlur={() => setActiveType('')}
            onFocus={() => setActiveType('Username')}
          />
        </Form.Item>
        <span
          className={classNames(
            styles['placeholder-label'],
            activeType === 'Username' || loginForm?.getFieldValue('username')
              ? styles['placeholder-focus']
              : '',
            activeType === 'Username' ? placeholderActiveClassName : '',
          )}
          style={{ color: token.colorTextQuaternary }}
          data-placeholder='请输入用户名'
          onClick={() => {
            usenameRef.current?.focus()
            setActiveType('Username')
          }}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='password' noStyle rules={[{ required: true, message: '请输入密码' }]}>
          <Input
            ref={passwordRef}
            type='password'
            onBlur={() => setActiveType('')}
            onFocus={() => setActiveType('Password')}
          />
        </Form.Item>
        <span
          className={classNames(
            styles['placeholder-label'],
            activeType === 'Password' || loginForm?.getFieldValue('password')
              ? styles['placeholder-focus']
              : '',
            activeType === 'Password' ? placeholderActiveClassName : '',
          )}
          data-placeholder='请输入密码'
          style={{ color: token.colorTextQuaternary }}
          onClick={() => {
            passwordRef.current?.focus()
            setActiveType('Password')
          }}
        />
      </Form.Item>
      <Form.Item className={styles['ant-form-item-none-margin']}>
        <Space>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className={styles['login-form-forgot']} style={{ color: token.colorPrimary }}>
            忘记密码?
          </a>
        </Space>
      </Form.Item>

      <Form.Item
        name='agreement'
        valuePropName='checked'
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('请先阅读并同意用户协议')),
          },
        ]}
      >
        <Checkbox>
          已阅读并同意 <a style={{ color: token.colorPrimary }}>《程序猿阿峰用户协议》</a>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type='primary' block htmlType='submit' className='login-form-button'>
          登 录
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AccountForm
