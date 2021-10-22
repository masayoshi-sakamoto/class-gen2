import { IApp } from '@/types/nuxt'
import LoginEntity from '@/entities/Login'

export default class LoginUseCase implements BaseUseCase {
  app: IApp
  constructor(app: IApp) {
    this.app = app
  }

  async execute(entity: LoginEntity) {
    try {
      this.app.state.auth = await this.app.<%= appName.toLowerCase() %>Gateway.Auth.Login(entity)
    } catch (exception: any) {
      if (exception.statusCode === 422) {
        this.app.state.errors = { username: 'IDまたはパスワードが違います' }
      } else if (exception.statusCode === 429) {
        this.app.state.errors = exception.raw.response.data.errors
      } else {
        throw new Error(exception)
      }
      return false
    }
    return true
  }
}
