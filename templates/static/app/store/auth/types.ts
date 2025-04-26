export const Types = {
  token: 'token',
  type: 'type',
  expired: 'expired'
}

export const path = 'auth/'

export class Token implements FluxStandardAction<string | null> {
  type = path + Types.token
  constructor(public payload: string | null) {}
}

export class Type implements FluxStandardAction<string | null> {
  type = path + Types.type
  constructor(public payload: string | null) {}
}

export class Expired implements FluxStandardAction<number | null> {
  type = path + Types.expired
  constructor(public payload: number | null) {}
}
