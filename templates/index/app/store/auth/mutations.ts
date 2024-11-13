import { MutationTree } from 'vuex'
import { IAuthState } from '@/store/auth'
import { Types, Token, Type, Expired } from '@/store/auth/types'

const mutations: MutationTree<IAuthState> = {
  [Types.token]: (state, action: Token) => {
    state.accessToken = action.payload
  },

  [Types.type]: (state, action: Type) => {
    state.tokenType = action.payload
  },

  [Types.expired]: (state, action: Expired) => {
    state.expired = action.payload
  }
}

export default mutations
