export interface IMediaProps {
  id?: string
  uploadId: number
  name: string | null
  mediaFile?: any
  isDirectory: boolean | null
  properties: any
  onUploadProgress?: any
  progress: number
  total: number
  createdAt: string | null
  updatedAt: string | null
}

export default class MediaEntity {
  private _props: IMediaProps

  constructor(props?: IMediaProps | null) {
    this._props = EmptyMediaPropsFactory(props)
  }

  get props(): IMediaProps {
    return this._props
  }

  get clone(): IMediaProps {
    return structuredClone(this._props)
  }

  get id(): string | undefined {
    return this._props.id
  }

  get name(): string | null {
    return this._props.name
  }

  get src(): string | null {
    return this._props.properties ? process.env.ASSETS_URL + '/media/' + this._props.id + '.' + this._props.properties.extension : null
  }

  get thumbnail(): string | null {
    if (this._props.properties.thumbnail && this._props.properties) {
      return process.env.ASSETS_URL + '/thumbnail/' + this._props.id + '.' + this._props.properties.extension
    }
    return this.src
  }

  get isDirectory(): boolean | null {
    return this._props.isDirectory
  }

  get properties(): any {
    return this._props.properties
  }

  get progress(): number {
    return this._props.progress
  }

  get size(): string {
    const decimal = Math.pow(10, 0)
    const kiro = 1024
    let size = this._props.properties.size
    let unit = 'B'
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    for (let i = units.length - 1; i > 0; i--) {
      if (this._props.properties.size / Math.pow(kiro, i) > 1) {
        size = Math.round((this._props.properties.size / Math.pow(kiro, i)) * decimal) / decimal
        unit = units[i]
        break
      }
    }
    return String(size) + unit
  }

  get createdAt(): string | null {
    return this._props.createdAt
  }

  get updatedAt(): string | null {
    return this._props.updatedAt
  }
}

export const headers = [
  { text: 'ID', value: 'id' },
  { text: '管理者ID', value: 'adminId' },
  { text: '名前', value: 'name' },
  { text: 'ディレクトリフラグ', value: 'isDirectory' },
  { text: 'プロパティ', value: 'properties' }
]

export const EmptyMediaPropsFactory = (props?: Partial<IMediaProps> | null): IMediaProps => ({
  uploadId: 0,
  name: null,
  mediaFile: null,
  isDirectory: false,
  properties: {},
  progress: 0,
  total: 0,
  createdAt: null,
  updatedAt: null,
  ...props
})
