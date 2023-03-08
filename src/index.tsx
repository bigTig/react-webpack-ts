import { Spin } from 'antd'
import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import './app.less'

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
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </Suspense>,
  )
}
