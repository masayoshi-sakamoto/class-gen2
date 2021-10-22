import { Context } from '@nuxt/types/app'
import { Middleware } from '@nuxt/types'
import { menus } from '@/entities/Menu'

const authenticated: Middleware = ({ App, redirect }: Context) => {
  App.state.menus = menus

  if (App.state.token) {
    return
  }

  App.state.clear()
  redirect('/login')
}

export default authenticated
