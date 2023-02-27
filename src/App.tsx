import React from 'react'
import { RecoilRoot } from 'recoil'
import Router from './routers'

const App = () => {
  return (
    <RecoilRoot>
      <Router />
    </RecoilRoot>
  )
}

export default App
