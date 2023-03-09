/* eslint-disable @typescript-eslint/no-explicit-any */
import { metaRoutersProps } from '@/routers/interface'

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
  let newStr = ''
  const newArr: string[] = []
  const arr = path.split('/').map(i => '/' + i)
  for (let i = 1; i < arr.length - 1; i++) {
    newStr += arr[i]
    newArr.push(newStr)
  }
  return newArr
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 所有的路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: any[] = []): metaRoutersProps => {
  let result: metaRoutersProps = {
    path: '',
  }
  for (const item of routes) {
    if (item.path === path) return item
    if (item.children) {
      const res = searchRoute(path, item.children)
      if (Object.keys(res).length) result = res
    }
  }
  return result
}

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (path: string, menuList: metaRoutersProps[]) => {
  const tempPath: metaRoutersProps[] = []
  try {
    const getNodePath = (node: metaRoutersProps) => {
      tempPath.push(node)
      // 找到符合条件的节点，通过throw终止掉递归
      if (node.path === path) {
        throw new Error('GOT IT!')
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i])
        }
        // 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop()
      } else {
        // 找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop()
      }
    }
    for (let i = 0; i < menuList.length; i++) {
      getNodePath(menuList[i])
    }
  } catch (e) {
    return tempPath.map(item => (item.meta?.title ? item.meta?.title : ''))
  }
}

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
export const findAllBreadcrumb = (menuList: metaRoutersProps[]): { [key: string]: any } => {
  const handleBreadcrumbList: any = {}
  const loop = (menuItem: metaRoutersProps) => {
    // 下面判断代码解释 *** !item?.children?.length   ==>   (item.children && item.children.length > 0)
    if (menuItem?.children?.length) {
      menuItem.children.forEach((item: any) => loop(item))
    } else {
      handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList)
    }
  }
  menuList.forEach(item => loop(item))
  return handleBreadcrumbList
}
