import { IMenuProps } from '@/entities/Menu'

export const Types = {
  layout: 'layout',
  loading: 'loading',
  progress: 'progress',
  errors: 'errors',
  drawer: 'drawer',
  alert: 'alert',
  current: 'current',
  toolbar: 'toolbar',
  extension: 'extension'
}

export const path = 'app/'

export class Layout implements FluxStandardAction<string> {
  type = path + Types.layout
  constructor(public payload: string) {}
}

export class Loading implements FluxStandardAction<boolean> {
  type = path + Types.loading
  constructor(public payload: boolean) {}
}

export class Progress implements FluxStandardAction<number> {
  type = path + Types.progress
  constructor(public payload: number) {}
}

export class Errors implements FluxStandardAction<any> {
  type = path + Types.errors
  constructor(public payload: any) {}
}

export class Drawer implements FluxStandardAction<boolean | null> {
  type = path + Types.drawer
  constructor(public payload: boolean | null) {}
}

export class Alert implements FluxStandardAction<boolean | null> {
  type = path + Types.alert
  constructor(public payload: boolean | null) {}
}

export class Current implements FluxStandardAction<IMenuProps | undefined> {
  type = path + Types.current
  constructor(public payload: IMenuProps | undefined) {}
}

export class Toolbar implements FluxStandardAction<boolean> {
  type = path + Types.toolbar
  constructor(public payload: boolean) {}
}

export class Extension implements FluxStandardAction<boolean> {
  type = path + Types.extension
  constructor(public payload: boolean) {}
}
