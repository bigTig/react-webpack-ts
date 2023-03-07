import { AliasToken } from 'antd/es/theme/internal'

export interface DefaultConfigProps {
  location: {
    pathname: string
  }
  siderWidth?: number
  breadcrumb?: boolean
  /**
   * @name theme for nav menu
   * @type  "light" | "dark" | "realDark"
   */
  navTheme?: 'dark' | 'light' | undefined
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
  logo?: string
  token?: {
    token?: Partial<AliasToken>
    header?: {
      colorBgHeader?: string
      colorHeaderTitle?: string
      colorBgMenuItemHover?: string
      colorBgMenuItemSelected?: string
      colorTextMenuSelected?: string
      colorTextMenuActive?: string
      colorTextMenu?: string
      colorTextMenuSecondary?: string
      colorBgRightActionsItemHover?: string
      colorTextRightActionsItem?: string
      heightLayoutHeader?: number
    }
    sider?: {
      colorMenuBackground?: string // 背景色
      colorBgMenuItemCollapsedHover?: string
      colorBgMenuItemCollapsedSelected?: string
      colorBgMenuItemCollapsedElevated?: string
      colorTextMenuSelected?: string // 选中的字体颜色
      colorTextMenuItemHover?: string // 鼠标经过的字体颜色
      colorTextMenuActive?: string //
      colorTextMenu?: string // 字体颜色
      paddingInlineLayoutMenu?: number
      paddingBlockLayoutMenu?: number
    }
    // 内容区
    pageContainer?: {
      paddingInlinePageContainerContent?: number
      paddingBlockPageContainerContent?: number
    }
  }
  bgLayoutImgList?: {
    src?: string
    top?: number
    right?: number
    bottom?: number
    left?: number
    height?: number
    width?: number
  }[]
}
