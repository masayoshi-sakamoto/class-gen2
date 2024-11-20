import { IApp } from '@/types/nuxt'

export default async function refresh(App: IApp) {
  const now = new Date().getTime()
  if (App.auth.expired && App.auth.expired < now) {
    App.auth.auth = await App.monitaroGateway.Auth.GetRefresh()
  }
}
