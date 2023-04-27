export interface MetaProps {
  /** 路由标题 */
  title: string
  /** 不在 side 菜单中显示 */
  hideMenu?: boolean
  /** 不需要 side 栏 */
  hideSide?: boolean
  /** 是否开启权限 */
  auth?: boolean
  /** 路由key 唯一 */
  key: string
  /** 图标 - 暂只支持 antd-icon */
  icon?: string
  /** 是否为 iframe */
  iframeUrl?: string
}

export interface metaRoutersProps {
  caseSensitive?: boolean
  /** 是否只有一层路由 */
  single?: boolean
  /** 子路由 */
  children?: metaRoutersProps[]
  /** 当前路由页面 */
  element?: React.ReactNode
  /** 路由 */
  path: string
  /** 额外信息 */
  meta?: MetaProps
  /** 是否为外链 */
  isLink?: string
}
