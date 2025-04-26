import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/app/types'
import { IMenuProps } from '@/entities/Menu'

export default class AppRepository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  get title(): string {
    return process.env.APPLICATION_NAME || 'アプリケーション'
  }

  set layout(value: string) {
    this.store.commit(new types.Layout(value))
  }

  get layout(): string {
    return this.store.state.app.layout
  }

  set errors(value: any) {
    this.store.commit(new types.Errors(value))
  }

  get errors(): any {
    return this.store.state.app.errors
  }

  set drawer(value: boolean | null) {
    this.store.commit(new types.Drawer(value))
  }

  get drawer(): boolean | null {
    return this.store.state.app.drawer
  }

  set alert(value: boolean | null) {
    this.store.commit(new types.Alert(value))
  }

  get alert(): boolean | null {
    return this.store.state.app.alert
  }

  set current(value: IMenuProps | undefined) {
    this.store.commit(new types.Current(value))
  }

  get current(): IMenuProps | undefined {
    return this.store.state.app.current
  }

  set toolbar(value: boolean) {
    this.store.commit(new types.Toolbar(value))
  }

  get toolbar(): boolean {
    return this.store.state.app.toolbar
  }

  set extension(value: boolean) {
    this.store.commit(new types.Extension(value))
  }

  get extension(): boolean {
    return this.store.state.app.extension
  }
}
