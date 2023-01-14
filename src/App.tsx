/* eslint-disable react/prop-types */
import React from 'react'
import Layout from './components/Layout'
import { RenderRoutes } from './router/router'

const App = () => {
  return <Layout content={RenderRoutes()} />
}

export default App
