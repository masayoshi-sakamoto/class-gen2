import { Context } from '@nuxt/types/app'
import { APIError } from '@/infrastructure/network/APIError'

export default class LogService {
  constructor(protected ctx: Context, protected logger: any) {}

  handle(exception: APIError, error?: boolean) {
    // エラーコードが無い、500番台ならsentryにログを出力
    if (!exception.statusCode || (exception.statusCode >= 500 && exception.statusCode <= 599)) {
      this.ctx.error(exception)
    } else if (exception.statusCode === 401) {
      this.ctx.redirect('/login')
    } else if (exception.statusCode === 404 || exception.statusCode === 403) {
      console.error(exception)
      if (error) {
        this.ctx.error(exception)
      }
    } else {
      // 422 429はエラーに保存して終了
      this.ctx.App.data.errors = exception.errors
    }
    return true
  }
}
