/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom } from 'recoil'

export const breadcrumbAtom = atom({
  key: 'breadcrumState',
  default: {} as any,
})
