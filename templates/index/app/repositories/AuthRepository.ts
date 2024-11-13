import { NuxtCookies } from 'cookie-universal-nuxt'
import { Store } from 'vuex'
import { RootState } from '@/store'
import * as types from '@/store/auth/types'
import { EmptyAuthPropsFactory, IAuthProps } from '@/entities/Auth'

export default class AppRepository {
  private cookies: NuxtCookies
  private store: Store<RootState>

  constructor(cookies: NuxtCookies, store: Store<RootState>) {
    this.cookies = cookies
    this.store = store
  }

  logout() {
    this.auth = null
  }

  set auth(value: IAuthProps | null) {
    const options = { path: '/', maxAge: 60 * 60 * 24 * 14 } // 2週間
    const remove = { path: '/', maxAge: 1 }

    if (value) {
      this.store.commit(new types.Token(value.accessToken))
      this.store.commit(new types.Type(value.tokenType))
      this.store.commit(new types.Expired(value.expired))
      this.cookies.set(process.env.APP_NAME + '_accessToken', value.accessToken, options)
      this.cookies.set(process.env.APP_NAME + '_tokenType', value.tokenType, options)
      this.cookies.set(process.env.APP_NAME + '_expired', value.expired, options)
    } else {
      this.store.commit(new types.Token(null))
      this.store.commit(new types.Type(null))
      this.store.commit(new types.Expired(null))
      this.cookies.remove(process.env.APP_NAME + '_accessToken', remove)
      this.cookies.remove(process.env.APP_NAME + '_tokenType', remove)
      this.cookies.remove(process.env.APP_NAME + '_expired', remove)
    }
  }

  get auth(): IAuthProps | null {
    return EmptyAuthPropsFactory({
      accessToken: this.store.state.auth.accessToken || this.cookies.get(process.env.APP_NAME + '_accessToken'),
      tokenType: this.store.state.auth.tokenType || this.cookies.get(process.env.APP_NAME + '_tokenType'),
      expired: this.store.state.auth.expired || this.cookies.get(process.env.APP_NAME + '_expired')
    })
  }

  // サーバーサイドでCookieが保存できないのでストアに保存した内容をあらためてCookieに保存し直すためのインターフェイス
  get data(): IAuthProps | null {
    return EmptyAuthPropsFactory({
      accessToken: this.store.state.auth.accessToken || this.cookies.get(process.env.APP_NAME + '_accessToken'),
      tokenType: this.store.state.auth.tokenType || this.cookies.get(process.env.APP_NAME + '_tokenType'),
      expired: this.store.state.auth.expired || this.cookies.get(process.env.APP_NAME + '_expired')
    })
  }

  get token(): string | null {
    return this.store.state.auth.accessToken || this.cookies.get(process.env.APP_NAME + '_accessToken')
  }

  get type(): string | null {
    return this.store.state.auth.tokenType || this.cookies.get(process.env.APP_NAME + '_tokenType')
  }

  get expired(): number {
    return Number(this.store.state.auth.expired || this.cookies.get(process.env.APP_NAME + '_expired'))
  }
}
