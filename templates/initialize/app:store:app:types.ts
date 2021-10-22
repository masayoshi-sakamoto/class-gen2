import MeEntity from '@/entities/Me'
import MenuEntity from '@/entities/Menu'

export const Types = {
  clear: 'clear',
  me: 'me',
  loading: 'loading',
  errors: 'errors',
  drawer: 'drawer',
  menus: 'menus'
}

export const path = 'app/'

export class Me implements FluxStandardAction<MeEntity> {
  type = path + Types.me
  constructor(public payload: MeEntity) {}
}

export class Clear implements FluxStandardAction<void> {
  type = path + Types.clear
  constructor() {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}

export class Drawer implements FluxStandardAction<boolean | null> {
  type = path + Types.drawer
  constructor(public payload: boolean | null) {}
}

export class Menus implements FluxStandardAction<MenuEntity[] | null> {
  type = path + Types.menus
  constructor(public payload: MenuEntity[] | null) {}
}
