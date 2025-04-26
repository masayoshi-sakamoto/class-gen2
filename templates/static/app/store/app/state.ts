import { IMenuProps } from '@/entities/Menu'

export interface IAppState {
  layout: string
  loading: boolean
  progress: number
  errors: any
  drawer: boolean | null
  alert: boolean | null
  current?: IMenuProps
  toolbar: boolean
  extension: boolean
}

export const state = (props?: Partial<IAppState>): IAppState => ({
  layout: 'default',
  loading: false,
  progress: 0,
  errors: {},
  drawer: false,
  alert: false,
  current: undefined,
  toolbar: false,
  extension: false,
  ...props
})

export default state
