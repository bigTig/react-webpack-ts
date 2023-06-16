import { Tag, theme } from 'antd'
import React, { useState } from 'react'
import styles from './index.less'

const { useToken } = theme
const { CheckableTag } = Tag

const tagsData = ['Movies', 'Books', 'Music', 'Sports']

/** 使用页面缓存时的tag页面标签 */
const AliveTag: React.FC = () => {
  const { token } = useToken()

  const [selectedTags, setSelectedTags] = useState<string[]>(['Movies'])

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
    setSelectedTags(nextSelectedTags)
  }

  return (
    <div className={styles['alive-tag']}>
      {tagsData.map(tag => (
        <CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          style={{ boxShadow: token.boxShadowTertiary }}
          onChange={checked => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </div>
  )
}

export default AliveTag
