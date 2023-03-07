import { AliasToken } from 'antd/es/theme/internal'

export interface DefaultConfigProps {
  location: {
    pathname: string
  }
  siderWidth?: number
  breadcrumb?: boolean
  title?: string
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
