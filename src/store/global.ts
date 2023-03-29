/* eslint-disable @typescript-eslint/no-explicit-any */
/** 系统公共数据 */
import defaultProps from '@/config/defaultProps'
import { LocalKeyEnum } from '@/core/enums/localKeyEnum'
import localStorageEffect from '@/core/storageEffect'
import { DefaultConfigProps } from '@/typings/global'
import { atom } from 'recoil'

/** global - 用户登录的 Token */
export const globalTokenAtom = atom({
  key: 'globalTokenState',
  default: '',
  effects_UNSTABLE: [localStorageEffect(LocalKeyEnum.ACCESSTOKEN)],
})

/** global - 系统配置数据 */
export const globalSystemConfigAtom = atom({
  key: 'globalSystemConfigState',
  default: {
    ...defaultProps,
  } as DefaultConfigProps,
  effects_UNSTABLE: [localStorageEffect(LocalKeyEnum.SYSTEMCONFIG)],
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
