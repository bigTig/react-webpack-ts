/** 系统公共数据 */
import defaultProps from '@/config/defaultProps'
import { DefaultConfigProps } from '@/global'
import { atom } from 'recoil'

/** global - 用户登录的 Token */
export const globalTokenAtom = atom({
  key: 'globalTokenState',
  default: '',
})

/** global - 系统配置数据 */
export const globalSystemConfigAtom = atom({
  key: 'globalSystemConfigState',
  default: {
    ...defaultProps,
  } as DefaultConfigProps,
})

/** global - 当前在什么系统下访问，0. web端（默认） 1. 移动端 2. 平板 */
export const globalSystemTypeAtom = atom({
  key: 'globalSystemTypeState',
  default: 0, // 0. web端（默认） 1. 移动端 2. 平板
})

/** global - 屏幕宽度 */
export const globalScreenWidthAtom = atom({
  key: 'globalScreenWidthState',
  default: document.body.clientWidth,
})
