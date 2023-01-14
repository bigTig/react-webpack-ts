import { RoutesConfig } from '@/config/routes'
import { MenuDataItem } from '@ant-design/pro-components'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const renderRoute = (routes: MenuDataItem[]) =>
  routes.map(route => (
    <Route path={route.path} element={route.component ? route.component : ''} key={route.path}>
      {route.children && renderRoute(route.children)}
    </Route>
  ))

export const RenderRoutes = () => <Routes>{renderRoute(RoutesConfig)}</Routes>
