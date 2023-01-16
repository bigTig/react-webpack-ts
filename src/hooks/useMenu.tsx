import { MenuConfig, MenuItemProps } from '@/config/menus'
import lodash from 'lodash'
import { useEffect, useState } from 'react'

export const useMenus = () => {
  const [headerMenu, setHeaderMenu] = useState<MenuItemProps[]>([])

  useEffect(() => {
    const copy = lodash.cloneDeep(MenuConfig)
    const headerLis = copy.map(el => {
      delete el.children
      return {
        ...el,
      }
    })

    setHeaderMenu(headerLis)
  }, [])

  return [headerMenu]
}

export default useMenus
