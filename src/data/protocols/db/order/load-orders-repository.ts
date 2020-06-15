import { OrderModel } from '../../../../domain/models/order'

export interface LoadOrdersRepository {
  loadAll: (socialSecurityNumber: string) => Promise<OrderModel[]>
}
