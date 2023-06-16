import { HOME_URL } from '@/config'
import { breadcrumbAtom } from '@/store/breadcrumb'
import { currentMenuAtom } from '@/store/menus'
import { LeftOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
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
  const BreadcrumbBack = () => {
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

  const breadcrumbItems = () => {
    const extraBreadcrumbItems: ItemType[] = [
      {
        title: BreadcrumbBack(),
        key: 'back',
      },
      {
        title: <Link to={`${HOME_URL}`}>首页</Link>,
        key: HOME_URL,
      },
    ]

    breadcrumbList.forEach((item: string, index: number) => {
      const last = index === breadcrumbList.length - 1

      if (item && item !== '首页') {
        extraBreadcrumbItems.push({
          title: (
            <React.Fragment key={index}>
              {last ? <span>{item}</span> : <Link to={pathname}>{item}</Link>}
            </React.Fragment>
          ),
          key: item,
        })
      }
    })

    return extraBreadcrumbItems
  }

  return <Breadcrumb className={styles['basic-breadcrumb']} items={breadcrumbItems()} />
}

export default BasicBreadcrumb
