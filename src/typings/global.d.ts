import { AliasToken } from 'antd/es/theme/internal'

export interface DefaultConfigProps {
  location: {
    pathname: string
  }
  /** 侧栏的宽度 */
  siderWidth: number
  /** 面包屑 */
  breadcrumb?: boolean
  /** 页脚 */
  footer?: boolean
  /**
   * @name theme 是否默认主题
   * @type  true | false
   */
  headerTheme?: boolean
  /**
   * @name theme for nav menu
   * @type  "light" | "dark" | "realDark"
   */
  navTheme?: 'dark' | 'light' | undefined
  /** 项目title */
  title?: string
  /**
   * @name layout 的布局方式
   * @type  'side' | 'top' | 'mix'
   *
   * @example 顶部菜单 layout="top"
   * @example 侧边菜单 layout="side"
   * @example 混合布局 既有顶部也有侧边 layout="mix"
   */
  layout?: 'side' | 'top' | 'mix'
  /** logo */
  logo?: string
  /** 默认头像 */
  avatar?: string
  token: {
    /** 重置antd,自定义主题 */
    token?: Partial<AliasToken>
    /** 自定义header */
    header: {
      colorBgHeader?: string // 头部菜单 背景色
      layoutHeaderHeight: number // 头部菜单 高度
    }
    /** 自定义侧栏 */
    sider?: {
      marginLayoutMenu?: number // 左侧菜单 margin min模式下有效
      paddingLayoutMenu?: number // 左侧菜单 padding min模式下有效
      borderRadiusMenu?: number // 左侧菜单 borderRadius min模式下有效
      overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto' // 左侧菜单 overflow min模式下有效
    }
    /** 内容区 */
    pageContainer?: {
      paddingInlinePageContainerContent?: number
      paddingBlockPageContainerContent?: number
    }
  }
}
