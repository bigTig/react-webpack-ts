import { HOME_URL } from '@/config'
import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

/** 403 页面 */
const NotAuth = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate(HOME_URL)
  }

  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, 您当前没有权限访问该页面.'
      extra={
        <Button type='primary' onClick={goHome}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotAuth
