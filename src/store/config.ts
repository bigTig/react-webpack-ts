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
