import { HOME_URL } from '@/config'
import { BreadcrumbRouteProps } from '@/global'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { LeftOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
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
  const { pathname } = useLocation()
  const breadcrumbState = useRecoilValue(breadcrumbAtom)
  const [breadcrumbList, setBreadcrumbList] = useState([])

  useEffect(() => {
    if (Object.keys(breadcrumbState).length) {
      setBreadcrumbList(breadcrumbState[pathname])
    }
  }, [breadcrumbState, pathname])

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
        <Breadcrumb.Item>
          <Link to={`${HOME_URL}`}>首页</Link>
        </Breadcrumb.Item>
        {breadcrumbList.map((item: string, index: number) => {
          const last = index === breadcrumbList.length - 1

          return item && item !== '首页' ? (
            <React.Fragment key={index}>
              {last ? (
                <Breadcrumb.Item key={index}>
                  <span>{item}</span>
                </Breadcrumb.Item>
              ) : (
                <Breadcrumb.Item key={index}>
                  <Link to={pathname}>{item}</Link>
                </Breadcrumb.Item>
              )}
            </React.Fragment>
          ) : null
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
