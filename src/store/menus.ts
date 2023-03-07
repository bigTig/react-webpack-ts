import { metaRoutersProps } from '@/routers/interface'
import { atom } from 'recoil'

export const menuAtom = atom({
  key: 'menuState',
  default: [] as Array<metaRoutersProps>,
})
