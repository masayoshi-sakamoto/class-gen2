import { Module } from 'vuex'
import { RootState } from '@/store'
import mutations from '@/store/auth/mutations'
import { path } from '@/store/auth/types'
import { mutation } from '@/utils/mutation'
import state, { IAuthState } from '@/store/auth/state'

export * from '@/store/auth/state'

export const store: Module<IAuthState, RootState> = {
  state,
  mutations: mutation(mutations, path)
}
