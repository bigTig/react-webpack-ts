import { DefaultConfigProps } from '@/typings/global'

const titleLogo = require('@/assets/images/common/logo_simple.svg')
const avatar = require('@/assets/images/common/title_logo.svg')

const defaultProps: DefaultConfigProps = {
  location: {
    pathname: '/home/index',
  },
  siderWidth: 200,
  breadcrumb: true,
  footer: false,
  headerTheme: false,
  navTheme: 'light',
  layout: 'mix',
  title: '程序猿阿峰',
  logo: titleLogo,
  avatar: avatar,
  token: {
    token: {
      colorPrimary: '#00b96b', // 品牌色是体现产品特性和传播理念最直观的视觉元素之一
      colorSuccess: '#7ed321', // 用于表示操作成功的 Token 序列
      colorWarning: '#FFC100', // 用于表示操作警告的 Token 序列
      colorInfo: '', // 用于表示操作信息的 Token 序列
      colorError: '#F53F3F', // 用于表示操作失败的 Token 序列
      colorTextBase: '#000000', // 用于派生文本色梯度的基础变量
      colorLinkHover: '#00b96b',
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
