import { metaRoutersProps } from '@/routers/interface'
import { atom } from 'recoil'

/** 左侧菜单栏数据 */
export const menuAtom = atom({
  key: 'menuState',
  default: [] as Array<metaRoutersProps>,
})

/** 当前选中的菜单 */
export const currentMenuAtom = atom({
  key: 'currentMenuState',
  default: {} as metaRoutersProps,
})

/** 屏幕宽度 */
export const screenWidthAtom = atom({
  key: 'screenWidthState',
  default: document.body.clientWidth,
})
