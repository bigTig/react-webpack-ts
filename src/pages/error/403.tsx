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
      subTitle='Sorry, you are not authorized to access this page.'
      extra={
        <Button type='primary' onClick={goHome}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotAuth
