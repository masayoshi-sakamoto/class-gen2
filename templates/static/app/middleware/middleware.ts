import { Context } from '@nuxt/types/app'
import { Middleware } from '@nuxt/types'
import MeUseCase from '@/usecases/auth/GetMeUseCase'
import menus from '@/assets/menu'

export const route: Middleware = ({ App, route }: Context) => {
  // ルートを取ってきて設定されているメニューと一致しているかを判定
  App.state.current = menus.find((prop) => prop?.id === route.name)
}

export const authenticated: Middleware = ({ App, redirect }: Context) => {
  if (!App.auth.token) {
    redirect('/login')
  }
}

export const me: Middleware = async ({ App }: Context) => {
  if (!App.doctor.current?.id) {
    await new MeUseCase(App).execute()
  }
}
