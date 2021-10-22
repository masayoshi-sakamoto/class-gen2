import { IApp } from '@/types/nuxt'

export default class LogoutUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute() {
    try {
      await this.app.<%= appName.toLowerCase() %>Gateway.Auth.Logout()
    } catch (exception) {
    } finally {
      this.app.state.clear()
    }
  }
}
