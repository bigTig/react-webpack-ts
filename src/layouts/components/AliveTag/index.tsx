import { aliveTagAtom } from '@/store/breadcrumb'
import { Tag, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAliveController } from 'react-activation'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import styles from './index.less'

const { useToken } = theme

/** 使用页面缓存时的tag页面标签 */
const AliveTag: React.FC = () => {
  const { token } = useToken()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { dropScope } = useAliveController()

  const [selectedTags, setSelectedTags] = useState(pathname)
  const [aliveTagState, setAliveTagState] = useRecoilState(aliveTagAtom)

  /** 切换tab */
  const handleChange = (e: React.MouseEvent<HTMLElement>, tag: string) => {
    e.preventDefault()
    if (tag === selectedTags) return
    navigate(tag)
    setSelectedTags(tag)
  }

  /** "卸载"仅可用于缓存状态下的节点 */
  const handleDropTag = (e: React.MouseEvent<HTMLElement>, url: string) => {
    e.preventDefault()
    if (url === selectedTags) return
    dropScope(url)
    const filter = aliveTagState.filter(el => el.url !== url)
    setAliveTagState(filter)
  }

  useEffect(() => {
    setSelectedTags(pathname)
  }, [pathname])

  return aliveTagState.length ? (
    <div className={styles['alive-tag']}>
      {aliveTagState.map(tag => (
        <Tag
          closable
          color={selectedTags === tag.url ? token.colorPrimary : 'default'}
          style={{
            cursor: 'pointer',
            backgroundColor: selectedTags !== tag.url ? token.colorWhite : token.colorPrimary,
          }}
          key={tag.url}
          onClick={e => handleChange(e, tag.url)}
          onClose={e => handleDropTag(e, tag.url)}
        >
          {tag.title}
        </Tag>
      ))}
    </div>
  ) : (
    <div style={{ paddingTop: token.paddingSM }} />
  )
}

export default AliveTag
