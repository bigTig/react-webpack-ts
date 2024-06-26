import { HOME_URL } from '@/config'
import { Button, Result } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

/** 网络异常 */
const NotNetwork = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate(HOME_URL)
  }

  return (
    <Result
      status='500'
      title='500'
      subTitle='Sorry, 哎呦, 网络出错了.'
      extra={
        <Button type='primary' onClick={goHome}>
          返回首页
        </Button>
      }
    />
  )
}

export default NotNetwork
