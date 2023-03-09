export interface MetaProps {
  title: string
  keepAlive?: boolean
  /** 不在 side 菜单中显示 */
  hideMenu?: boolean
  /** 不需要 side 栏 */
  hideSide?: boolean
  requiresAuth?: boolean
  key: string
  icon?: string
}

export interface metaRoutersProps {
  caseSensitive?: boolean
  single?: boolean
  children?: metaRoutersProps[]
  element?: React.ReactNode
  path: string
  meta?: MetaProps
  isLink?: string
}

// export type metaRoutersProps<T> = Partial<T> & { meta: MetaProps; children?: metaRoutersProps<T>[] }
