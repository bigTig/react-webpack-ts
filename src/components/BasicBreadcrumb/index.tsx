import { BreadcrumbRouteProps } from '@/global'
import { LeftOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.less'

interface BasicBreadcrumbProps {
  routes: BreadcrumbRouteProps[]
}

/**
 * 面包屑
 * @returns
 */
const BasicBreadcrumb: React.FC<BasicBreadcrumbProps> = props => {
  const { routes } = props

  const breadcrumbBack = () => {
    const isHideMenu = routes[routes.length - 1].hideMenu

    return isHideMenu ? (
      <span className={styles['basic-breadcrumb-back']}>
        <LeftOutlined style={{ marginRight: 5, fontSize: 12 }} />
        返回
      </span>
    ) : null
  }

  const itemRender = () => {
    return (
      <>
        {routes.map(route => {
          const last = routes.indexOf(route) === routes.length - 1

          return (
            <>
              {last ? (
                <Breadcrumb.Item>
                  <span>{route.breadcrumbName}</span>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item>
                  <Link to={route.path}>{route.breadcrumbName}</Link>
                </Breadcrumb.Item>
              )}
            </>
          )
        })}
      </>
    )
  }

  return (
    <Breadcrumb className={styles['basic-breadcrumb']} style={{ margin: '16px 0' }}>
      {breadcrumbBack()}
      {itemRender()}
    </Breadcrumb>
  )
}

export default BasicBreadcrumb
