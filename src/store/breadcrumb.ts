/* eslint-disable @typescript-eslint/no-explicit-any */
import { AliveTagProps } from '@/typings/global'
import { atom } from 'recoil'

/** 面包屑状态管理 */
export const breadcrumbAtom = atom({
  key: 'breadcrumState',
  default: {} as any,
})

/** keepalive 路由存储 */
export const aliveTagAtom = atom({
  key: 'aliveTagState',
  default: [] as AliveTagProps[],
})
