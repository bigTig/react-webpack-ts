import React from 'react'
import BasicLayout from './components/BasicLayout'
import { MenuConfig } from './config/menus'

const App = () => {
  return <BasicLayout menus={MenuConfig} />
}

export default App
