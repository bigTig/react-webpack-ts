import { metaRoutersProps } from '@/routers/interface'
import { atom } from 'recoil'

/** 左侧菜单栏数据 */
export const menuAtom = atom({
  key: 'menuState',
  default: [] as Array<metaRoutersProps>,
})

/** 当前选中的菜单 */
export const currentSelectMenuAtom = atom({
  key: 'selectMenuState',
  default: {} as metaRoutersProps,
})
