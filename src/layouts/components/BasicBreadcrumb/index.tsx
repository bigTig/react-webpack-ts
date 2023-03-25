import { HOME_URL } from '@/config'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { currentMenuAtom } from '@/store/menus'
import { LeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styles from './index.less'

/**
 * 面包屑
 * @returns
 */
const BasicBreadcrumb: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const breadcrumbState = useRecoilValue(breadcrumbAtom)
  const currentMenuState = useRecoilValue(currentMenuAtom)
  const [breadcrumbList, setBreadcrumbList] = useState([])

  useEffect(() => {
    if (Object.keys(breadcrumbState).length) {
      setBreadcrumbList(breadcrumbState[pathname])
    }
  }, [breadcrumbState, pathname])

  /** 面包屑返回按钮 */
  const breadcrumbBack = () => {
    const isHideMenu = currentMenuState.meta?.hideSide

    return isHideMenu ? (
      <Button
        style={{ marginRight: 10 }}
        icon={<LeftOutlined style={{ fontSize: 12 }} />}
        onClick={() => navigate(-1)}
      >
        返回
      </Button>
    ) : null
  }

  const itemRender = () => {
    return (
      <>
        {breadcrumbBack()}
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

  return <Breadcrumb className={styles['basic-breadcrumb']}>{itemRender()}</Breadcrumb>
}

export default BasicBreadcrumb
