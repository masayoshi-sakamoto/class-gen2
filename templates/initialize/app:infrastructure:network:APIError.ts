export interface APIError {
  message: string
  statusCode: number | undefined
  raw: Error
}
