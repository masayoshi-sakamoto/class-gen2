import MeEntity, { EmptyMeEntityFactory } from '@/entities/Me'
import MenuEntity from '@/entities/Menu'

export interface IAppState {
  me: MeEntity
  loading: boolean
  errors: any
  drawer: boolean | null
  menus: MenuEntity[] | null
}

export const state = (props?: Partial<IAppState>): IAppState => ({
  me: EmptyMeEntityFactory(),
  loading: false,
  errors: {},
  drawer: null,
  menus: null,
  ...props
})

export default state
