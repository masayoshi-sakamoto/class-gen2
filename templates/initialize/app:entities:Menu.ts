export interface IMenuProps {
  id: string
  title: string
  icon: string | null
  to: any | null
  href: string | null
  group: string | null
  children: MenuEntity[] | null
}

export default class MenuEntity {
  private _props: IMenuProps

  constructor(props: IMenuProps) {
    this._props = props
  }

  get props(): IMenuProps {
    return this._props
  }

  get id(): string {
    return this._props.id
  }

  get title(): string {
    return this._props.title
  }

  get icon(): string | null {
    return this._props.icon
  }

  get to(): any | null {
    return this._props.to
  }

  get href(): string | null {
    return this._props.href
  }

  get group(): string | null {
    return this._props.group
  }

  get children(): MenuEntity[] | null {
    return this._props.children
  }
}

export const EmptyMenuPropsFactory = (props?: Partial<IMenuProps>): IMenuProps => ({
  id: '',
  title: '',
  icon: null,
  to: null,
  href: null,
  group: null,
  children: null,
  ...props
})

export const EmptyMenuEntityFactory = (props?: Partial<IMenuProps>): MenuEntity => {
  return new MenuEntity(EmptyMenuPropsFactory(props))
}

export const menu1: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: '1',
    title: 'サブメニュー1',
    icon: 'mdi-home-outline',
    to: { name: 'menu1-submenu1' }
  }),
  EmptyMenuEntityFactory({
    id: '2',
    title: 'サブメニュー2',
    icon: 'mdi-home-outline',
    to: { name: 'menu1-submenu2' }
  })
]

export const menu2: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: '1',
    title: 'サブメニュー1',
    icon: 'mdi-home-outline',
    to: { name: 'menu2-submenu1' }
  }),
  EmptyMenuEntityFactory({
    id: '2',
    title: 'サブメニュー2',
    icon: 'mdi-home-outline',
    to: { name: 'menu2-submenu1' }
  })
]

export const shops: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: '1',
    title: 'ダッシュボード',
    icon: 'mdi-view-dashboard',
    to: { name: 'index' }
  }),
  EmptyMenuEntityFactory({
    id: '2',
    title: 'メニュー１',
    icon: 'mdi-account',
    group: 'submenu1|submenu2',
    children: menu1
  }),
  EmptyMenuEntityFactory({
    id: '3',
    title: 'メニュー2',
    icon: 'mdi-store',
    group: 'submenu1|submenu2',
    children: menu2
  })
]

export const subs: MenuEntity[] = [
  EmptyMenuEntityFactory({
    id: '1',
    title: 'ログアウト',
    icon: 'mdi-home-outline',
    to: { name: 'logout' }
  })
]
