import defaultProps from '@/config/defaultProps'
import { DefaultConfigProps } from '@/global'
import { atom } from 'recoil'

/** 系统配置数据 */
export const systemConfigAtom = atom({
  key: 'systemConfigState',
  default: {
    ...defaultProps,
  } as DefaultConfigProps,
})

/** 当前在什么系统下访问，0. web端（默认） 1. 移动端 2. 平板 */
export const systemTypeAtom = atom({
  key: 'systemTypeState',
  default: 0, // 0. web端（默认） 1. 移动端 2. 平板
})
