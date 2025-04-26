export interface IAccountProps {
  name: string | null
  code: string | null
  username: string | null
  password: string | null
  newPassword: string | null
  properties: object | null
  policy: object | null
}

export default class AccountEntity {
  private _props: IAccountProps

  constructor(props?: IAccountProps | null) {
    this._props = EmptyAccountPropsFactory(props)
  }

  get props(): IAccountProps {
    return this._props
  }

  get clone(): IAccountProps {
    return structuredClone(this._props)
  }
}

export const headers = [{ text: 'ID', value: 'id' }]

export const EmptyAccountPropsFactory = (props?: Partial<IAccountProps> | null): IAccountProps => ({
  name: null,
  code: null,
  username: null,
  password: null,
  newPassword: null,
  properties: null,
  policy: null,
  ...props
})
