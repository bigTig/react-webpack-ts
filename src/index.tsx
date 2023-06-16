import React from 'react'
import { AliveScope } from 'react-activation'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import './app.less'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <AliveScope>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </AliveScope>
    </BrowserRouter>,
  )
}
