export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
  headers?: any
  params?: any
  resellerId?: string
  resellerItr?: string
}
