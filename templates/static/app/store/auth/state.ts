export interface IAuthState {
  accessToken: string | null
  tokenType: string | null
  expired: number | null
}

export const state = (props?: Partial<IAuthState>): IAuthState => ({
  accessToken: null,
  tokenType: null,
  expired: null,
  ...props
})

export default state
