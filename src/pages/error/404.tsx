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
      subTitle='Sorry, 兄弟, 页面跟丢啦!'
      extra={
        <Button type='primary' onClick={goHome}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotFound
