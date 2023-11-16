## 项目默认配置

### 类型定义

```ts
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
```

### 默认配置信息

> 通过默认配置，更改系统初始化数据

```tsx
import { DefaultConfigProps } from '@/typings/global'

const titleLogo = require('@/assets/images/common/title_logo.svg')

const defaultProps: DefaultConfigProps = {
  location: {
    pathname: '/home/index',
  },
  siderWidth: 200,
  breadcrumb: true,
  footer: false,
  headerTheme: false,
  navTheme: 'light',
  layout: 'top',
  title: '猪猪管家',
  logo: titleLogo,
  token: {
    token: {
      colorPrimary: '#5988D8', // 品牌色是体现产品特性和传播理念最直观的视觉元素之一
      colorSuccess: '#7ed321', // 用于表示操作成功的 Token 序列
      colorWarning: '#FFC100', // 用于表示操作警告的 Token 序列
      colorInfo: '', // 用于表示操作信息的 Token 序列
      colorError: '#F53F3F', // 用于表示操作失败的 Token 序列
      colorTextBase: '#000000', // 用于派生文本色梯度的基础变量
      controlHeight: 32,
      fontSize: 14,
    },
    header: {
      colorBgHeader: '#FFFFFF',
      layoutHeaderHeight: 64,
    },
    sider: {
      marginLayoutMenu: 12,
      paddingLayoutMenu: 4,
      borderRadiusMenu: 8,
      overflow: 'hidden',
    },
    pageContainer: {
      paddingInlinePageContainerContent: 12,
      paddingBlockPageContainerContent: 12,
    },
  },
}

export default defaultProps
```
