import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/app/types'
import MeEntity from '@/entities/Me'
import MenuEntity from '@/entities/Menu'
import { EmptyAuthPropsFactory, IAuthProps } from '@/entities/Auth'

export default class AppRepository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  clear() {
    this.auth = null
    this.store.commit(new types.Clear())
  }

  set auth(value: IAuthProps | null) {
    if (value) {
      // トークンの利用可能時間を保存
      const date = new Date().getTime() + 1000 * 60 * Number(value.expired)
      this.cookies.set('accessToken', value.accessToken, { maxAge: 60 * 60 * 24 * 14 }) // 2週間
      this.cookies.set('tokenType', value.tokenType, { maxAge: 60 * 60 * 24 * 14 }) // 2週間
      this.cookies.set('expired', date, { maxAge: 60 * 60 * 24 * 14 }) // 2週間
    } else {
      this.cookies.remove('accessToken', { maxAge: 1 })
      this.cookies.remove('tokenType', { maxAge: 1 })
      this.cookies.remove('expired', { maxAge: 1 })
    }
  }

  get auth(): IAuthProps | null {
    return EmptyAuthPropsFactory({
      accessToken: this.cookies.get('accessToken'),
      tokenType: this.cookies.get('tokenType'),
      expired: this.cookies.get('expired')
    })
  }

  get token(): string {
    return this.cookies.get('accessToken')
  }

  get expired(): number {
    return Number(this.cookies.get('expired'))
  }

  set me(value: MeEntity) {
    this.store.commit(new types.Me(value))
  }

  get me(): MeEntity {
    return this.store.state.app.me
  }

  set loading(value: boolean) {
    this.store.commit(new types.Loading(value))
  }

  get loading(): boolean {
    return this.store.state.app.loading
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

  set menus(value: MenuEntity[] | null) {
    this.store.commit(new types.Menus(value))
  }

  get menus(): MenuEntity[] | null {
    return this.store.state.app.menus
  }
}
