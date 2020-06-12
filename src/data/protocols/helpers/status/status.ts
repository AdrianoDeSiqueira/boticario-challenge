export interface Status {
  get: (socialSecurityNumber: string) => Promise<string>
}
