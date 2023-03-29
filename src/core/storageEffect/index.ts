/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultValue } from 'recoil'

/** 数据持久化 Effect */
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    /** 如果有一个持久化的值，在加载时设置它 */
    const savedValue = localStorage.getItem(key)

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue))
    }

    onSet((newValue: any) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    })
  }

export default localStorageEffect
