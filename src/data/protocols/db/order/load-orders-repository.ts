import { OrderModel } from '@/domain/models/order'

export interface LoadOrdersRepository {
  loadAll: (resellerId: string) => Promise<OrderModel[]>
}
