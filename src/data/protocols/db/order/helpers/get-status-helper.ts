export interface GetStatusHelper {
  get: (socialSecurityNumber: string) => Promise<string>
}
