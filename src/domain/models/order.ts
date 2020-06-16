export type OrderModel = {
  id: string
  code: string
  value: number
  date: Date
  itr: string
  cashbackPerc?: number
  cashbackValue?: number
  status?: string
}
