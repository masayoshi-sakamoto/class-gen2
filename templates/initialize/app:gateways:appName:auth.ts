import { <%= appName %>GatewayBase } from './base'
import { toLoginSeed } from './translator/login'
import { toAuthProps } from './translator/auth'
import { toMeProps } from './translator/me'
import { Login, Refresh, Logout, Me } from '@/infrastructure/network/<%= appName %>/requests/auth'
import LoginEntity from '@/entities/Login'
import { IAuthProps } from '@/entities/Auth'
import { IMeProps } from '@/entities/Me'

export default class Auth extends <%= appName %>GatewayBase {
  async Login(entity: LoginEntity): Promise<IAuthProps> {
    const { login } = await this.apiClient.request(new Login(toLoginSeed(entity.props)))
    return toAuthProps(login)
  }

  async Refresh(): Promise<IAuthProps> {
    const { login } = await this.apiClient.request(new Refresh())
    return toAuthProps(login)
  }

  async Logout() {
    await this.apiClient.request(new Logout())
  }

  async Me(): Promise<IMeProps> {
    const { me } = await this.apiClient.request(new Me())
    return toMeProps(me)
  }

}
