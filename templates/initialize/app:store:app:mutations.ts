import { MutationTree } from 'vuex'
import { IAppState, state as init } from '@/store/app'
import { Types, Me, Loading, Errors, Drawer, Menus } from '@/store/app/types'

const mutations: MutationTree<IAppState> = {
  [Types.clear]: (state) => {
    Object.assign(state, init())
  },

  [Types.me]: (state, action: Me) => {
    state.me = action.payload
  },

  [Types.loading]: (state, action: Loading) => {
    state.loading = action.payload
  },

  [Types.errors]: (state, action: Errors) => {
    state.errors = action.payload === null ? {} : action.payload
  },

  [Types.drawer]: (state, action: Drawer) => {
    state.drawer = action.payload
  },

  [Types.menus]: (state, action: Menus) => {
    state.menus = action.payload
  }
}

export default mutations
