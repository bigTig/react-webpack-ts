import { metaRoutersProps } from '@/routers/interface'
import { atom } from 'recoil'

/** 左侧菜单栏数据 */
export const sideMenuAtom = atom({
  key: 'sideMenuState',
  default: [] as Array<metaRoutersProps>,
})

/** 当前选中的菜单 */
export const currentMenuAtom = atom({
  key: 'currentMenuState',
  default: {} as metaRoutersProps,
})
