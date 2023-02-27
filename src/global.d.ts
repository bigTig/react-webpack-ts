export interface BreadcrumbRouteProps {
  path: string
  breadcrumbName: string
  hideMenu?: boolean
}

export interface MenuOptions {
  path: string
  title: string
  icon?: string
  isLink?: string
  close?: boolean
  children?: MenuOptions[]
}
