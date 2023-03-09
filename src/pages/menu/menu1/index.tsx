import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Menu1 = () => {
  const navigate = useNavigate()

  return (
    <div className='card content-box'>
      <span className='text'>Menu1 🍓🍇🍈🍉</span>
      <Button onClick={() => navigate('/menu/menu2/menu22/menu222')}>
        去 /menu/menu2/menu22/menu222 页面
      </Button>
    </div>
  )
}

export default Menu1
