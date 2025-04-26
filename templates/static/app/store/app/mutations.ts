import { MutationTree } from 'vuex'
import { IAppState } from '@/store/app'
import { Types, Layout, Loading, Progress, Errors, Drawer, Alert, Current, Toolbar, Extension } from '@/store/app/types'

const mutations: MutationTree<IAppState> = {
  [Types.layout]: (state, action: Layout) => {
    state.layout = action.payload
  },

  [Types.loading]: (state, action: Loading) => {
    state.loading = action.payload
  },

  [Types.progress]: (state, action: Progress) => {
    state.progress = action.payload
  },

  [Types.errors]: (state, action: Errors) => {
    state.errors = action.payload === null ? {} : action.payload
  },

  [Types.drawer]: (state, action: Drawer) => {
    state.drawer = action.payload
  },

  [Types.alert]: (state, action: Alert) => {
    state.alert = action.payload
  },

  [Types.current]: (state, action: Current) => {
    state.current = action.payload
  },

  [Types.toolbar]: (state, action: Toolbar) => {
    state.toolbar = action.payload
  },

  [Types.extension]: (state, action: Extension) => {
    state.extension = action.payload
  }
}

export default mutations
