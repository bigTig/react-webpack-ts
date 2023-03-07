import { ConfigProvider, Spin } from 'antd'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './app.less'
import defaultProps from './config/defaultProps'

const loading = (
  <div style={{ display: 'flex', height: '100vh' }}>
    <Spin size='large' style={{ margin: 'auto' }} />
  </div>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(
    <Suspense fallback={loading}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: defaultProps.token?.token,
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </Suspense>,
  )
}
