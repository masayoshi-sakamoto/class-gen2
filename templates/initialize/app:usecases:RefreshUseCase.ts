import { IApp } from '@/types/nuxt'

export default class RefreshUseCase {
  public async refresh(app: IApp) {
    const now = new Date().getTime()
    if (app.state.expired && app.state.expired < now) {
      app.state.auth = await app.<%= appName.toLowerCase() %>Gateway.Auth.Refresh()
    }
  }
}
