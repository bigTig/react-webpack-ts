export interface MetaProps {
  title: string
  keepAlive?: boolean
  requiresAuth?: boolean
  key: string
  icon?: string
}

export interface metaRoutersProps {
  caseSensitive?: boolean
  single?: boolean
  children?: metaRoutersProps[]
  element?: React.ReactNode
  path: string
  meta?: MetaProps
  isLink?: string
}

// export type metaRoutersProps<T> = Partial<T> & { meta: MetaProps; children?: metaRoutersProps<T>[] }
