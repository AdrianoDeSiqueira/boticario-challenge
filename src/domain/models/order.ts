export type OrderModel = {
  id: string
  itr: string
  code: string
  value: number
  date: Date
  cashbackPerc?: number
  cashbackValue?: number
  status?: string
  resellerId: string
}
