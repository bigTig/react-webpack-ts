import { HOME_URL } from '@/config'
import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

/** 页面找不到 */
const NotFound = () => {
  const navigate = useNavigate()

  const goHome = () => {
    navigate(HOME_URL)
  }

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={goHome}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
